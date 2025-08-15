import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '../../shared/ai-service';

export async function POST(request: NextRequest) {
  try {
    const { userQuestion, experienceContext } = await request.json();
    
    // Use server environment variable (without NEXT_PUBLIC_)
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const aiService = new AIService(apiKey);
    const response = await aiService.generateResponse(userQuestion, experienceContext);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 