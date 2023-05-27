import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class ResponseNobodyUserDto {
  @ApiProperty()
  email: string;

  static fromEntity(user: User): ResponseNobodyUserDto {
    return { email: user.email };
  }
}
