import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsUrl, MaxLength } from 'class-validator';
import DateTransformer from 'src/components/DateTransformer';
import { IsAfterDate } from 'src/validation/isAfterDate.validator';
import * as dayjs from 'dayjs';

export class CreateInternshipDto {
  @Expose()
  get year(): string {
    return dayjs().year().toString();
  }

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  applicationStart: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('applicationStart')
  applicationEnd: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('applicationEnd')
  trainingStart: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('trainingStart')
  trainingEnd: string;

  @IsUrl()
  @MaxLength(2048)
  @ApiProperty({ maxLength: 2048 })
  trainingLink: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('trainingEnd')
  examStart: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('examStart')
  examEnd: string;

  @IsUrl()
  @MaxLength(2048)
  @ApiProperty({ maxLength: 2048 })
  examLink: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('examEnd')
  championshipStart: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('championshipStart')
  championshipEnd: string;

  @IsUrl()
  @MaxLength(2048)
  @ApiProperty({ maxLength: 2048 })
  championshipLink: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('championshipEnd')
  distributionStart: string;

  @Expose()
  get distributionEnd(): string {
    return dayjs(this.sprintThreeStart).subtract(1, 'day').format('YYYY-MM-DD');
  }

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('distributionStart')
  sprintOneStart: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('sprintOneStart')
  sprintOneEnd: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('sprintOneEnd')
  sprintTwoStart: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('sprintTwoStart')
  sprintTwoEnd: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('sprintTwoEnd')
  sprintThreeStart: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('sprintThreeStart')
  sprintThreeEnd: string;
}
