import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

@Public()
@Controller('_internal')
@ApiTags('_internal')
export class InternalController {
  @HttpCode(HttpStatus.OK)
  @Get('ready')
  async ready() {
    return 'ok';
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('live')
  async live() {
    return 'ok';
  }
}
