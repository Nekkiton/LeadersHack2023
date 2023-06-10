import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, Max, Min } from 'class-validator';

export class PromoteCandidateDto {
  @ApiProperty()
  @IsBoolean()
  admitted: boolean;

  @ApiProperty({ type: 'number' })
  @IsInt()
  @Min(0)
  @Max(50) // TODO configurable
  championship: number;
}
