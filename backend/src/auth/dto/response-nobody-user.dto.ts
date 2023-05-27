import { User } from 'src/users/entities/user.entity';

export class ResponseNobodyUserDto {
  email: string;

  static fromEntity(user: User): ResponseNobodyUserDto {
    return { email: user.email };
  }
}
