import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '../../shared/ai-service';
import { makeDesignPrompt } from '../../shared/design-prompt';
import {
  DAILY_LIMIT,
  consumeAttempt,
  refundAttempt,
  remainingAttempts,
} from '../../shared/rate-limit';

export const dynamic = 'force-dynamic';

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return (
    forwarded?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'local'
  );
}

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

type StreamChunk = {
  choices?: Array<{ delta?: { content?: string } }>;
};

function chunkText(payload: string): string {
  if (!payload || payload === '[DONE]') return '';
  try {
    const json = JSON.parse(payload) as StreamChunk;
    return json.choices?.[0]?.delta?.content ?? '';
  } catch {
    return '';
  }
}

export async function GET(request: NextRequest) {
  const remaining = await remainingAttempts(clientIp(request));
  return NextResponse.json(
    { remaining, limit: DAILY_LIMIT },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);

  const apiKey =
    process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OpenAI API key not configured');
    return errorResponse('unavailable', 500);
  }

  const attempt = await consumeAttempt(ip);
  if (!attempt.allowed) {
    return errorResponse('limit', 429);
  }

  let upstream: Response;
  try {
    upstream = await new AIService(apiKey).streamDesign(makeDesignPrompt());
  } catch (error) {
    console.error('Design API request failed:', error);
    await refundAttempt(ip);
    return errorResponse('unavailable', 502);
  }

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text();
    const quota =
      upstream.status === 429 || /insufficient_quota|rate_limit/i.test(errText);
    console.error('Design API error:', upstream.status);
    await refundAttempt(ip);
    return errorResponse(quota ? 'quota' : 'unavailable', quota ? 429 : 502);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      reader = upstream.body!.getReader();
      let buffer = '';
      let failed = false;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const text = chunkText(trimmed.slice(5).trim());
            if (text) controller.enqueue(encoder.encode(text));
          }
        }

        const tail = chunkText(buffer.trim().replace(/^data:\s*/, ''));
        if (tail) controller.enqueue(encoder.encode(tail));
      } catch (error) {
        failed = true;
        try {
          controller.error(error);
        } catch {
          // The client already disconnected.
        }
      } finally {
        if (!failed) controller.close();
      }
    },
    cancel() {
      reader?.cancel().catch(() => undefined);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
      'X-Attempts-Remaining': String(attempt.remaining),
    },
  });
}
