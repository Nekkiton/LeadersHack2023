import { ApiProperty } from '@nestjs/swagger';

export class ApplicationScore {
  @ApiProperty({ type: 'number' })
  workSchedule: number;

  @ApiProperty({ type: 'number' })
  experience: number;

  @ApiProperty({ type: 'number' })
  projectActivity: number;

  @ApiProperty({ type: 'number' })
  about: number;

  @ApiProperty({ type: 'number' })
  training: number;

  @ApiProperty({ type: 'number' })
  championship: number;

  static fromDb(jsonb: string): ApplicationScore {
    return JSON.parse(jsonb) as ApplicationScore;
  }

  static toDb(entity: ApplicationScore): string {
    return JSON.stringify(entity);
  }
}
