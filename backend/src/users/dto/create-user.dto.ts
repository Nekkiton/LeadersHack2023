import { Role } from 'src/auth/roles/role.enum';
export class CreateUserDto {
  role: Role;
  email: string;
  passwordHash: string;
}
