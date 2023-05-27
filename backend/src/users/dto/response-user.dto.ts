import { Role } from 'src/auth/roles/role.enum';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  email: string;

  static fromEntity(user: User): ResponseUserDto {
    return { role: user.role, email: user.email };
  }
}
