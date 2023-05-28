import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Patch, Post, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserPayload } from 'src/auth/auth.service';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CandidateInfoService } from 'src/candidate-info/candidate-info.service';
import { CreateCandidateInfoDto } from 'src/candidate-info/dto/create-candidate-info.dto';
import { ResponseCandidateInfoDto } from 'src/candidate-info/dto/response-candidate-info.dto';
import { UpdateCandidateInfoDto } from 'src/candidate-info/dto/update-candidate-info.dto';
import { UsersService } from 'src/users/users.service';

@Controller('candidates')
@ApiTags('candidates')
@ApiCookieAuth()
export class CandidatesController {
  constructor(private usersService: UsersService, private candidateInfoService: CandidateInfoService) {}

  @Get('info/me')
  @Roles(Role.CANDIDATE)
  @ApiOperation({ summary: 'Get current user candidate info' })
  @ApiOkResponse({ type: ResponseCandidateInfoDto })
  @ApiNotFoundResponse()
  async getCandidateInfo(@Req() req): Promise<ResponseCandidateInfoDto> {
    const payload: UserPayload = req.user;
    const user = await this.usersService.findOne({ email: payload.email });
    const info = await this.candidateInfoService.findOne(user);
    if (!info) {
      throw new NotFoundException('Candidate info have not created yet');
    }
    return ResponseCandidateInfoDto.fromEntity(info);
  }

  @Post('info/me')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates current user candidate info' })
  @ApiOkResponse({ type: ResponseCandidateInfoDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async createUserProfile(@Body() dto: CreateCandidateInfoDto, @Req() req): Promise<ResponseCandidateInfoDto> {
    const payload: UserPayload = req.user;
    const user = await this.usersService.findOne({ email: payload.email });
    const profile = await this.candidateInfoService.create(user, dto);
    return ResponseCandidateInfoDto.fromEntity(profile);
  }

  @Patch('info/me')
  @ApiOperation({ summary: 'Partially updates current user candidate info' })
  @ApiOkResponse({ type: ResponseCandidateInfoDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async updateUserProfile(@Body() dto: UpdateCandidateInfoDto, @Req() req): Promise<ResponseCandidateInfoDto> {
    const payload: UserPayload = req.user;
    const user = await this.usersService.findOne({ email: payload.email });
    const profile = await this.candidateInfoService.update(user, dto);
    return ResponseCandidateInfoDto.fromEntity(profile);
  }
}
