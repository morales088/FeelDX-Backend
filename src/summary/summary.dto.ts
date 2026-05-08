import { IsString, IsNotEmpty, IsObject, IsNotEmptyObject } from 'class-validator';

export class GenerateSummaryDto {
  @IsString()
  @IsNotEmpty()
  room: string;

  @IsObject()
  @IsNotEmptyObject()
  selections: Record<string, string | null>;
}