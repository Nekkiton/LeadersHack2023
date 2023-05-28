import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  password?: string;
}
