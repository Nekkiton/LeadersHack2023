import { compare, hash } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, passwordHash: string): Promise<any> {
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
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async create(username: string, password: string): Promise<void> {
    const passwordHash = await hash(
      password,
      this.configService.get('jwt.saltRounds'),
    );
    this.usersService.create({ username, passwordHash });
  }
}
