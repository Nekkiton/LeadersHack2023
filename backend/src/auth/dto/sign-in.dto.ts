import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
