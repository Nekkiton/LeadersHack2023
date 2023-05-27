import { User } from 'src/users/entities/user.entity';
import { Role } from '../roles/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseSignInDto {
  @ApiProperty()
  email: string;

  @ApiProperty({ enum: Role })
  role: Role;

  static fromEntity(user: User): ResponseSignInDto {
    return {
      email: user.email,
      role: user.role,
    };
  }
}
