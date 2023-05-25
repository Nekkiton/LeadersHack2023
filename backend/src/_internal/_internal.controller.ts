import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('_internal')
export class InternalController {
  @HttpCode(HttpStatus.OK)
  @Get('ready')
  async ready() {
    return 'ok';
  }

  @HttpCode(HttpStatus.OK)
  @Get('live')
  async live() {
    return 'ok';
  }
}
