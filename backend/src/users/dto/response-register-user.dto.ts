import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class ResponseRegisterUserDto {
  @ApiProperty()
  email: string;

  static fromEntity(user: User): ResponseRegisterUserDto {
    return { email: user.email };
  }
}
