import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserProfileDto {
  @IsString()
  @MaxLength(255)
  referralId: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  surname: string;

  @IsString()
  @MaxLength(255)
  patronymic: string;

  @IsString()
  @MaxLength(1000)
  residency: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  photo: string;
}
