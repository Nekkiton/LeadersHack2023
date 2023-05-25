import { compare, hash } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, passwordHash: string): Promise<string> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const matched = await compare(passwordHash, user.passwordHash);
    if (!matched) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = {
      sub: user.id,
      name: user.username,
    };
    return this.jwtService.signAsync(payload);
  }

  async validateToken<T extends object>(token: string): Promise<T> {
    try {
      return await this.jwtService.verifyAsync<T>(token, {
        secret: this.configService.get('jwt.secret'),
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  async create(username: string, password: string): Promise<User> {
    const passwordHash = await hash(password, this.configService.get('jwt.saltRounds'));
    return this.usersService.create({ username, passwordHash });
  }
}
