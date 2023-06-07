import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../application-status/application-status.enum';
import { ApplicationData } from './application-data.dto';
import { ApplicationScore } from './application-score.dto';
import { Application } from '../entities/application.entity';

export class ResponseApplicationDto {
  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ApplicationStatus })
  status: ApplicationStatus;

  @ApiProperty()
  score: ApplicationScore;

  @ApiProperty()
  data: ApplicationData;

  static fromEntity(entity: Application): ResponseApplicationDto {
    return {
      email: entity.user.email,
      data: entity.data,
      score: entity.score,
      status: entity.status,
    };
  }
}
