import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.signIn(signInDto);
    /**
     * TODO:
     * 1. Set domain
     * 2. secure: true
     * 3. sameSite: 'strict'
     * 4. httpOnly: true
     */
    const ttlSeconds = parseInt(this.configService.get('jwt.expiresIn'), 10);
    res.cookie('access_token', token, {
      expires: new Date(Date.now() + ttlSeconds * 1000),
    });
    return;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async auth(@Req() req: Request) {
    const token = req.cookies['access_token'];
    if (!token) {
      throw new UnauthorizedException();
    }
    await this.authService.validateToken(token);
  }
}
