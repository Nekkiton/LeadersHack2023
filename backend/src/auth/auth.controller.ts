import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
  UseGuards,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';

@Injectable()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.signIn(signInDto.username, signInDto.password);
    res.setHeader('authentication', `Bearer ${token}`);
    return;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async auth(@Req() req: Request) {
    const token = req.header['authentication'];
    if (!token) {
      throw new UnauthorizedException();
    }
    await this.authService.validateToken(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  create(@Body() signInDto: SignInDto) {
    return this.authService.create(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
