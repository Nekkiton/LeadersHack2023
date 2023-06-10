import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../application-status/application-status.enum';

export class ApplicationData {
  @ApiProperty({ enum: ApplicationStatus })
  rejectedOn: ApplicationStatus;

  @ApiProperty({ maxLength: 1000 })
  rejectionReason: string;

  @ApiProperty()
  rated: {
    by: string;
    on: string;
  };

  accepted: {
    by: string;
    on: string;
  };

  static fromDb(jsonb: string): ApplicationData {
    return JSON.parse(jsonb) as ApplicationData;
  }

  static toDb(entity: ApplicationData): string {
    return JSON.stringify(entity);
  }

  static getDefault(): ApplicationData {
    return {
      rejectedOn: null,
      rejectionReason: null,
      rated: null,
      accepted: null,
    };
  }
}
