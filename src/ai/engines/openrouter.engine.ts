import { ConfigService } from '@nestjs/config';
import { ROOMS_DATA, CATEGORY_LABELS } from 'src/materials/materials.data';

export class OpenRouterEngine {
  constructor(private config: ConfigService) {}

  async generate(room: string, selections: Record<string, string | null>) {
    const apiKey = this.config.get('OPENROUTER_API_KEY');
    const model = this.config.get('OPENROUTER_MODEL');

    const roomData = ROOMS_DATA.find(r => r.id === room);
    const catLabels = (roomData?.categories || []).map(id => CATEGORY_LABELS[id]).filter(Boolean);

    const systemPrompt = `You are an expert interior design consultant for FeelDX.
Analyze room material selections and respond ONLY with valid JSON, no markdown or explanation.`;

    const userPrompt = `Room: ${room}
Categories for this room (use ONLY these): ${catLabels.join(', ')}
Selections: ${JSON.stringify(selections, null, 2)}

Respond with this exact JSON. The "missing" array must only contain items from: ${catLabels.join(', ')}
{
  "costLevel": "Low | Medium | High | Mixed",
  "issues": ["design or compatibility issues"],
  "missing": ["unselected category labels from the list above only"],
  "recommendations": ["specific recommendations"],
  "nextActions": ["next steps"]
}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': this.config.get('FRONTEND_URL') || 'https://feeldx.vercel.app',
        'X-Title': 'FeelDX Assistant',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.error?.message || `HTTP ${response.status}`;
      throw new Error(`OpenRouter: ${message}`);
    }

    const raw = data.choices?.[0]?.message?.content ?? '{}';
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

    try {
      const parsed = JSON.parse(cleaned);

      // ensure missing only contains known category labels for this room
      parsed.missing = (parsed.missing || []).filter((label: string) =>
        catLabels.includes(label)
      );

      return { room, ...parsed };
    } catch {
      throw new Error('OpenRouter returned invalid JSON');
    }
  }
}
