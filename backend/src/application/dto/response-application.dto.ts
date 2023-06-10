import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ApplicationStatus } from '../application-status/application-status.enum';
import { ApplicationData } from './application-data.dto';
import { ApplicationScore } from './application-score.dto';
import { Application } from '../entities/application.entity';
import { ResponseInternshipDto } from 'src/internship/dto/response-internship.dto';

class PartialInternship extends PartialType(ResponseInternshipDto) {}
class PartialApplicationData extends PartialType(ApplicationData) {}

export class ResponseApplicationDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  internship: PartialInternship;

  @ApiProperty({ enum: ApplicationStatus })
  status: ApplicationStatus;

  @ApiProperty()
  score: ApplicationScore;

  @ApiProperty()
  data: PartialApplicationData;

  static fromEntity(entity: Application): ResponseApplicationDto {
    const internship: PartialInternship = {
      year: entity.internship.year,
    };
    switch (entity.status) {
      case ApplicationStatus.MODERATION:
      case ApplicationStatus.WAIT_FOR_TRAINING:
      case ApplicationStatus.TRAINING:
        internship.trainingStart = entity.internship.trainingStart;
        internship.trainingEnd = entity.internship.trainingEnd;
        if (entity.status === ApplicationStatus.TRAINING) {
          internship.trainingLink = entity.internship.trainingLink;
        }
        break;
      case ApplicationStatus.EXAMINATION:
        internship.examinationStart = entity.internship.examinationStart;
        internship.examinationEnd = entity.internship.examinationEnd;
        internship.examinationLink = entity.internship.examinationLink;
        break;
      case ApplicationStatus.CHAMPIONSHIP:
        internship.championshipStart = entity.internship.championshipStart;
        internship.championshipEnd = entity.internship.championshipEnd;
        internship.championshipLink = entity.internship.championshipLink;
      default:
        internship.applicationStart = entity.internship.applicationStart;
        internship.applicationEnd = entity.internship.applicationEnd;
        break;
    }
    const data: PartialApplicationData = entity.status === ApplicationStatus.COMPLETED ? entity.data : {};
    return {
      email: entity.user.email,
      internship,
      data,
      score: entity.score,
      status: entity.status,
    };
  }
}
