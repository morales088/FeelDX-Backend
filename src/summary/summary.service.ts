import { Injectable, BadRequestException } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { GenerateSummaryDto } from './summary.dto';
import { ROOMS_DATA } from '../materials/materials.data';

@Injectable()
export class SummaryService {
  constructor(private aiService: AiService) {}

  async generate(dto: GenerateSummaryDto) {
    const validRooms = ROOMS_DATA.map(r => r.id);
    if (!validRooms.includes(dto.room)) {
      throw new BadRequestException(`Invalid room: ${dto.room}`);
    }
    return this.aiService.generateSummary(dto.room, dto.selections);
  }
}