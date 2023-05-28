import { Role } from 'src/auth/roles/role.enum';

export class UpdateUserDto {
  role?: Role;
  passwordHash?: string;
}
