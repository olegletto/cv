const DEFAULT_MODEL = 'gpt-5.5';
const FALLBACK_MODEL = 'gpt-4o';

function isReasoningModel(model: string): boolean {
  return /^(gpt-5|o\d)/.test(model);
}

export class AIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private request(model: string, prompt: string): Promise<Response> {
    const messages = [
      {
        role: 'system',
        content:
          'You are an award-winning web designer. Reply with raw CSS only. No markdown, no comments, no explanation.',
      },
      { role: 'user', content: prompt },
    ];

    const body = isReasoningModel(model)
      ? {
          model,
          messages,
          max_completion_tokens: 8000,
          reasoning_effort: process.env.OPENAI_DESIGN_REASONING || 'low',
          stream: true,
        }
      : {
          model,
          messages,
          max_tokens: 4000,
          temperature: 1,
          stream: true,
        };

    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });
  }

  async streamDesign(prompt: string): Promise<Response> {
    const model = process.env.OPENAI_DESIGN_MODEL || DEFAULT_MODEL;
    const response = await this.request(model, prompt);

    // The key may have no access to the preferred model: retry once on the fallback.
    if ((response.status === 400 || response.status === 404) && model !== FALLBACK_MODEL) {
      console.error(`Model ${model} rejected (${response.status}), falling back to ${FALLBACK_MODEL}`);
      return this.request(FALLBACK_MODEL, prompt);
    }
    return response;
  }
}
