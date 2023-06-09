import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsUrl, MaxLength } from 'class-validator';
import DateTransformer from 'src/components/DateTransformer';
import { IsAfterDate } from 'src/validation/isAfterDate.validator';
import * as dayjs from 'dayjs';
import { isCurrentYear } from 'src/validation/isCurrentYear.validator';

export class CreateInternshipDto {
  @Expose()
  get year(): string {
    return dayjs().year().toString();
  }

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @isCurrentYear()
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
  examinationStart: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('examinationStart')
  examinationEnd: string;

  @IsUrl()
  @MaxLength(2048)
  @ApiProperty({ maxLength: 2048 })
  examinationLink: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  @IsAfterDate<CreateInternshipDto>('examinationEnd')
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
  @isCurrentYear()
  sprintThreeEnd: string;
}
