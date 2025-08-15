import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '../../shared/ai-service';

// Handle OPTIONS request for CORS
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    const { userQuestion, experienceContext } = await request.json();
    
    // Use server environment variable (without NEXT_PUBLIC_)
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500, headers }
      );
    }

    const aiService = new AIService(apiKey);
    const response = await aiService.generateResponse(userQuestion, experienceContext);
    
    return NextResponse.json({ response }, { headers });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 