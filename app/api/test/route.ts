import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  return NextResponse.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    hasApiKey: !!process.env.OPENAI_API_KEY
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ 
      message: 'POST is working!',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return NextResponse.json({ 
      error: 'Failed to parse JSON',
      timestamp: new Date().toISOString()
    }, { status: 400 });
  }
} 