import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ApplicationService } from 'src/application/application.service';
import { CandidateApplicationDto } from 'src/application/dto/candidate-application.dto';
import { ResponseApplicationDto } from 'src/application/dto/response-application.dto';
import { Application } from 'src/application/entities/application.entity';
import { UserPayload } from 'src/auth/auth.service';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CandidateInfoService } from 'src/candidate-info/candidate-info.service';
import { CreateCandidateInfoDto } from 'src/candidate-info/dto/create-candidate-info.dto';
import { ResponseCandidateInfoDto } from 'src/candidate-info/dto/response-candidate-info.dto';
import { UpdateCandidateInfoDto } from 'src/candidate-info/dto/update-candidate-info.dto';
import { InternshipService } from 'src/internship/internship.service';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { UsersService } from 'src/users/users.service';
import { EntityManager } from 'typeorm';

@Controller('candidates')
@ApiTags('candidates')
@ApiCookieAuth()
export class CandidatesController {
  constructor(
    private usersService: UsersService,
    private internshipService: InternshipService,
    private candidateInfoService: CandidateInfoService,
    private userProfileService: UserProfilesService,
    private applicationService: ApplicationService,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get('me/info')
  @Roles(Role.CANDIDATE)
  @ApiOperation({ summary: 'Get current user candidate info' })
  @ApiOkResponse({ type: ResponseCandidateInfoDto })
  @ApiNotFoundResponse()
  async getCandidateInfo(@Req() req): Promise<ResponseCandidateInfoDto> {
    const payload: UserPayload = req.user;
    const user = await this.usersService.findOne({ email: payload.email });
    const info = await this.candidateInfoService.findOne({ user });
    if (!info) {
      throw new NotFoundException('Candidate info have not created yet');
    }
    return ResponseCandidateInfoDto.fromEntity(info);
  }

  @Post('me/info')
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.CANDIDATE)
  @ApiOperation({ summary: 'Creates current user candidate info' })
  @ApiCreatedResponse({ type: ResponseCandidateInfoDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async createUserProfile(@Body() dto: CreateCandidateInfoDto, @Req() req): Promise<ResponseCandidateInfoDto> {
    const payload: UserPayload = req.user;
    const user = await this.usersService.findOne({ email: payload.email });
    const profile = await this.candidateInfoService.create({ user }, dto);
    return ResponseCandidateInfoDto.fromEntity(profile);
  }

  @Patch('me/info')
  @ApiOperation({ summary: 'Partially updates current user candidate info' })
  @Roles(Role.CANDIDATE)
  @ApiOkResponse({ type: ResponseCandidateInfoDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async updateUserProfile(@Body() dto: UpdateCandidateInfoDto, @Req() req): Promise<ResponseCandidateInfoDto> {
    const payload: UserPayload = req.user;
    const user = await this.usersService.findOne({ email: payload.email });
    const profile = await this.candidateInfoService.update({ user }, dto);
    return ResponseCandidateInfoDto.fromEntity(profile);
  }

  @Get('me/application')
  @Roles(Role.CANDIDATE)
  @ApiOperation({ summary: 'Get current candidate application for running internship' })
  @ApiOkResponse({ type: ResponseApplicationDto })
  @ApiNotFoundResponse()
  async getMyApplication(@Req() req): Promise<ResponseApplicationDto> {
    const payload: UserPayload = req.user;
    const user = await this.usersService.findOne({ email: payload.email });
    if (user.role !== Role.CANDIDATE) {
      throw new BadRequestException('You are not candidate');
    }
    const internship = await this.internshipService.findCurrent();
    const application = await this.applicationService.findOne({ user, internship });
    return ResponseApplicationDto.fromEntity(application);
  }

  @Post('me/application')
  @Roles(Role.CANDIDATE)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates current candidate application for running internship' })
  @ApiCreatedResponse({ type: ResponseApplicationDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async createMyApplication(@Body() dto: CandidateApplicationDto, @Req() req): Promise<ResponseApplicationDto> {
    let application: Application;
    await this.entityManager.transaction(async (entityManager) => {
      const payload: UserPayload = req.user;
      const user = await this.usersService.findOne({ email: payload.email }, { entityManager });
      const internship = await this.internshipService.findCurrent({ entityManager });
      if (dto.userProfile) {
        await this.userProfileService.update({ user }, dto.userProfile, { entityManager });
      }
      if (dto.candidateProfile) {
        await this.candidateInfoService.update({ user }, dto.candidateProfile, { entityManager });
      }
      application = await this.applicationService.createApplication(user, internship);
    });
    return ResponseApplicationDto.fromEntity(application);
  }
}
