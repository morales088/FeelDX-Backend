import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { GenerateSummaryDto } from './summary.dto';
import { ApiKeyGuard } from '../guards/api-key/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  generate(@Body() dto: GenerateSummaryDto) {
    console.log(dto)
    return this.summaryService.generate(dto);
  }
}