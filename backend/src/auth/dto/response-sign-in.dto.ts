import { User } from 'src/users/entities/user.entity';
import { Role } from '../roles/role.enum';

export class ResponseSignInDto {
  email: string;

  role: Role;

  static fromEntity(user: User): ResponseSignInDto {
    return {
      email: user.email,
      role: user.role,
    };
  }
}
