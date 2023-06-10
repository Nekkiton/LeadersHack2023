import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt } from 'class-validator';

// TODO configurable values for IsIn
export class RateApplicationDto {
  @ApiProperty({ type: 'number' })
  @IsInt()
  @IsIn([0, 5, 10])
  experience: number;

  @ApiProperty({ type: 'number' })
  @IsInt()
  @IsIn([0, 5, 10])
  projectActivity: number;

  @ApiProperty({ type: 'number' })
  @IsInt()
  @IsIn([0, 5, 10])
  about: number;
}
