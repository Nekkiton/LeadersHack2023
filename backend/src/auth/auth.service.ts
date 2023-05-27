import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { Role } from './roles/role.enum';
import { User } from 'src/users/entities/user.entity';

export interface UserPayload extends Record<string, unknown> {
  email: string;
  role: Role;
}

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async compare(user: User, password): Promise<boolean> {
    return compare(password, user.passwordHash);
  }

  async signIn(user: User): Promise<string> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.signAsync(payload);
  }

  async validateToken(token: string): Promise<UserPayload> {
    try {
      return await this.jwtService.verifyAsync<UserPayload>(token, {
        secret: this.configService.get('jwt.secret'),
      });
    } catch {
      throw new UnauthorizedException();
    }
  }
}
