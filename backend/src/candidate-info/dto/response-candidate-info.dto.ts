import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CandidateInfo } from '../entities/candidate-info.entity';
import { InternshipDirection } from '../direction/direction.enum';
import { Education } from '../education/education.dto';
import { WorkSchedule } from '../work-schedule/work-schedule.enum';

export class ResponseCandidateInfoDto {
  @ApiProperty({ enum: WorkSchedule })
  workSchedule: WorkSchedule;

  @ApiPropertyOptional({ maxLength: 100000 })
  experience: string;

  @ApiPropertyOptional({ maxLength: 100000 })
  projectActivity: string;

  @ApiPropertyOptional({ maxLength: 100000 })
  about: string;

  @ApiProperty()
  education: Education;

  @ApiProperty({ enum: InternshipDirection })
  internshipDirection: InternshipDirection;

  static fromEntity(entity: CandidateInfo): ResponseCandidateInfoDto {
    return {
      workSchedule: entity.workSchedule,
      experience: entity.experience,
      projectActivity: entity.projectActivity,
      about: entity.about,
      education: entity.education,
      internshipDirection: entity.internshipDirection,
    };
  }
}
