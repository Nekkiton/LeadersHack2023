import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { Role } from 'src/auth/roles/role.enum';
export class CreateUserDto {
  @IsEnum(Role)
  @ApiProperty({ enum: Role })
  role: Role;

  @IsEmail()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  password: string;
}
