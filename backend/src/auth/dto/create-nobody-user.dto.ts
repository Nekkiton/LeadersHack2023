import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateNobodyUserDto {
  @IsEmail()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  password: string;
}
