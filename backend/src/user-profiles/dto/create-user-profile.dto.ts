import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';
import DateTransformer from 'src/components/DateTransformer';

export class CreateUserProfileDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  name: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  surname: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  patronymic: string;

  @IsDateString()
  @ApiProperty({ format: 'date' })
  @Transform(DateTransformer)
  birthday: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  citizenship: string;

  @IsString()
  @MaxLength(1000)
  @ApiProperty({ maxLength: 1000 })
  location: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  phone: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 1000 })
  photo: string;
}

export class ReferralCreateUserProfileDto extends CreateUserProfileDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  referralId: string;
}
