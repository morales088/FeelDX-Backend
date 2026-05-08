import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MockEngine } from './engines/mock.engine';
import { OpenRouterEngine } from './engines/openrouter.engine';

@Injectable()
export class AiService {
  constructor(private config: ConfigService) {}

  async generateSummary(room: string, selections: Record<string, string | null>) {
    const engine = this.config.get('AI_ENGINE');
    if (engine === 'openrouter') {
      return new OpenRouterEngine(this.config).generate(room, selections);
    }
    return new MockEngine().generate(room, selections);
  }
}