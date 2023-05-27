import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmptyObject, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { WorkSchedule } from '../work-schedule/work-schedule.enum';
import { Education } from '../education/education.dto';
import { InternshipDirection } from '../direction/direction.enum';
import { Type } from 'class-transformer';

export class CreateCandidateInfoDto {
  @IsEnum(WorkSchedule)
  @ApiProperty({ enum: WorkSchedule })
  workSchedule: WorkSchedule;

  @MaxLength(100000)
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 100000 })
  experience: string;

  @MaxLength(100000)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ maxLength: 100000 })
  projectActivity: string;

  @MaxLength(100000)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ maxLength: 100000 })
  about: string;

  @ApiProperty()
  @ValidateNested()
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => Education)
  education: Education;

  @IsEnum(InternshipDirection)
  @ApiProperty({ enum: InternshipDirection })
  internshipDirection: InternshipDirection;
}
