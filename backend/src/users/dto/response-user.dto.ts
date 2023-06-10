import { Role } from 'src/auth/roles/role.enum';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  email: string;

  static fromEntity(user: User): ResponseUserDto {
    return { id: user.id, role: user.role, email: user.email };
  }
}
