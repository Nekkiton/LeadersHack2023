import { ApplicationStatus } from '../application-status/application-status.enum';
import { ApplicationData } from './application-data.dto';
import { ApplicationScore } from './application-score.dto';

export class CreateApplicationDto {
  status: ApplicationStatus;
  score: ApplicationScore;
  data: ApplicationData;
}
