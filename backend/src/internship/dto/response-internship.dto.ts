import { ApiProperty } from '@nestjs/swagger';
import { Internship } from '../entities/internship.entity.ts';
export class ResponseInternshipDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  year: string;

  @ApiProperty({ format: 'date' })
  applicationStart: string;

  @ApiProperty({ format: 'date' })
  applicationEnd: string;

  @ApiProperty({ format: 'date' })
  trainingStart: string;

  @ApiProperty({ format: 'date' })
  trainingEnd: string;

  @ApiProperty({ maxLength: 2048 })
  trainingLink: string;

  @ApiProperty({ format: 'date' })
  examinationStart: string;

  @ApiProperty({ format: 'date' })
  examinationEnd: string;

  @ApiProperty({ maxLength: 2048 })
  examinationLink;

  @ApiProperty({ format: 'date' })
  championshipStart: string;

  @ApiProperty({ format: 'date' })
  championshipEnd: string;

  @ApiProperty({ maxLength: 2048 })
  championshipLink;

  @ApiProperty({ format: 'date' })
  distributionStart: string;

  @ApiProperty({ format: 'date' })
  distributionEnd: string;

  @ApiProperty({ format: 'date' })
  sprintOneStart: string;

  @ApiProperty({ format: 'date' })
  sprintOneEnd: string;

  @ApiProperty({ format: 'date' })
  sprintTwoStart: string;

  @ApiProperty({ format: 'date' })
  sprintTwoEnd: string;

  @ApiProperty({ format: 'date' })
  sprintThreeStart: string;

  @ApiProperty({ format: 'date' })
  sprintThreeEnd: string;

  static fromEntity(entity: Internship): ResponseInternshipDto {
    return {
      id: entity.id,
      year: entity.year,
      applicationStart: entity.applicationStart,
      applicationEnd: entity.applicationEnd,
      trainingStart: entity.trainingStart,
      trainingEnd: entity.trainingEnd,
      trainingLink: entity.trainingLink,
      examinationStart: entity.examinationStart,
      examinationEnd: entity.examinationEnd,
      examinationLink: entity.examinationLink,
      championshipStart: entity.championshipStart,
      championshipEnd: entity.championshipEnd,
      championshipLink: entity.championshipLink,
      distributionStart: entity.distributionStart,
      distributionEnd: entity.distributionEnd,
      sprintOneStart: entity.sprintOneStart,
      sprintOneEnd: entity.sprintOneEnd,
      sprintTwoStart: entity.sprintTwoStart,
      sprintTwoEnd: entity.sprintTwoEnd,
      sprintThreeStart: entity.sprintThreeStart,
      sprintThreeEnd: entity.sprintThreeEnd,
    };
  }
}
