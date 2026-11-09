import { createHash } from 'crypto';

// Site creations allowed per IP per 24 hours (fixed window, starts at the first creation).
export const DAILY_LIMIT = Number(process.env.DESIGN_DAILY_LIMIT) || 3;

const WINDOW_SECONDS = 24 * 60 * 60;

// Upstash Redis (also what the Vercel Marketplace "Upstash Redis"/KV integration injects).
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

// Fallback for local development, or if Redis is not configured or unreachable.
// Serverless instances do not share this, so on Vercel it is only approximate.
const memory = new Map<string, number[]>();

function keyFor(ip: string): string {
  return 'design:' + createHash('sha256').update(ip).digest('hex').slice(0, 32);
}

type RedisReply = { result?: unknown; error?: string };

async function redis(commands: Array<Array<string | number>>): Promise<RedisReply[]> {
  const response = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Redis HTTP ${response.status}`);
  const replies = (await response.json()) as RedisReply[];
  const failed = replies.find((reply) => reply.error);
  if (failed) throw new Error(failed.error);
  return replies;
}

const redisConfigured = Boolean(REDIS_URL && REDIS_TOKEN);

function memoryUsed(key: string): number[] {
  const now = Date.now();
  const recent = (memory.get(key) ?? []).filter(
    (time) => now - time < WINDOW_SECONDS * 1000,
  );
  memory.set(key, recent);
  return recent;
}

export type Attempt = { allowed: boolean; remaining: number };

/** Uses one attempt if any are left. */
export async function consumeAttempt(ip: string): Promise<Attempt> {
  const key = keyFor(ip);

  if (redisConfigured) {
    try {
      const replies = await redis([
        ['INCR', key],
        ['EXPIRE', key, WINDOW_SECONDS, 'NX'],
      ]);
      const count = Number(replies[0].result);
      if (count > DAILY_LIMIT) {
        await redis([['DECR', key]]);
        return { allowed: false, remaining: 0 };
      }
      return { allowed: true, remaining: DAILY_LIMIT - count };
    } catch (error) {
      console.error('Rate limit store failed, using memory:', error);
    }
  }

  const used = memoryUsed(key);
  if (used.length >= DAILY_LIMIT) return { allowed: false, remaining: 0 };
  used.push(Date.now());
  return { allowed: true, remaining: DAILY_LIMIT - used.length };
}

/** How many attempts are left, without using one. */
export async function remainingAttempts(ip: string): Promise<number> {
  const key = keyFor(ip);

  if (redisConfigured) {
    try {
      const replies = await redis([['GET', key]]);
      const count = Number(replies[0].result ?? 0);
      return Math.max(0, DAILY_LIMIT - count);
    } catch (error) {
      console.error('Rate limit store failed, using memory:', error);
    }
  }

  return Math.max(0, DAILY_LIMIT - memoryUsed(key).length);
}

/** Gives an attempt back, e.g. when the AI request failed through no fault of the visitor. */
export async function refundAttempt(ip: string): Promise<void> {
  const key = keyFor(ip);

  if (redisConfigured) {
    try {
      await redis([['DECR', key]]);
      return;
    } catch (error) {
      console.error('Rate limit refund failed, using memory:', error);
    }
  }

  const used = memoryUsed(key);
  used.pop();
}
