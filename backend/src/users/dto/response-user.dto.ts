import { Role } from 'src/auth/roles/role.enum';
import { User } from '../entities/user.entity';

export class ResponseUserDto {
  role: Role;
  email: string;

  static fromEntity(user: User): ResponseUserDto {
    return { role: user.role, email: user.email };
  }
}
