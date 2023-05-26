import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { Role } from './roles/role.enum';
import { SignInDto } from './dto/sign-in.dto';

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

  async signIn(dto: SignInDto): Promise<string> {
    const user = await this.usersService.findOne(dto.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const matched = await compare(dto.password, user.passwordHash);
    if (!matched) {
      throw new UnauthorizedException();
    }
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
