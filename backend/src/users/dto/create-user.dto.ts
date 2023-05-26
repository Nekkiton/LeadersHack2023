import { IsEmail, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { Role } from 'src/auth/roles/role.enum';
export class CreateUserDto {
  @IsEnum(Role)
  role: Role;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
