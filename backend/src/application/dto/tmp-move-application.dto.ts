import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApplicationStatus } from '../application-status/application-status.enum';

/**
 * TODO delete after demo
 */
export class TmpMoveApplicationDto {
  @ApiProperty()
  @IsEnum(ApplicationStatus)
  @IsIn([ApplicationStatus.TRAINING, ApplicationStatus.EXAMINATION, ApplicationStatus.CHAMPIONSHIP])
  status: ApplicationStatus;

  @ApiProperty({ type: 'number' })
  @IsInt()
  @Min(0)
  @Max(50) // TODO configurable
  @IsOptional()
  examination?: number;
}
