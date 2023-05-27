import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

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
  @ApiProperty({ maxLength: 1000, required: false })
  photo: string;
}

export class ReferralCreateUserProfileDto extends CreateUserProfileDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  referralId: string;
}
