import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ApplicationStatus } from 'src/application/application-status/application-status.enum';
import { ApplicationService } from 'src/application/application.service';
import { CandidateApplicationDto } from 'src/application/dto/candidate-application.dto';
import { TmpMoveApplicationDto } from 'src/application/dto/tmp-move-application.dto';
import { RateApplicationDto } from 'src/application/dto/rate-application.dto';
import { ResponseApplicationDto } from 'src/application/dto/response-application.dto';
import { ResponseCandidateDto } from 'src/application/dto/response-candidate.dto';
import { UpdateApplicationDto } from 'src/application/dto/update-application.dto';
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
import { PromoteCandidateDto } from 'src/application/dto/promote-candidate.dto';
import { ConfigService } from '@nestjs/config';

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
    private configService: ConfigService,
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
      const userProfile = dto.userProfile
        ? await this.userProfileService.upsert({ user }, dto.userProfile, { entityManager })
        : await this.userProfileService.findOne({ user });
      const candidateProfile = dto.candidateProfile
        ? await this.candidateInfoService.upsert({ user }, dto.candidateProfile, { entityManager })
        : await this.candidateInfoService.findOne({ user });
      application = await this.applicationService.createApplication(user, userProfile, candidateProfile, internship);
    });
    return ResponseApplicationDto.fromEntity(application);
  }

  @Post(':id/application/rate')
  @Roles(Role.CURATOR)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rate candidate during moderation step' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async rateCandidateApplication(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() dto: RateApplicationDto,
  ): Promise<void> {
    const user = await this.usersService.findOneById(id);
    const internship = await this.internshipService.findCurrent();
    const application = await this.applicationService.findOne({ user, internship });
    if (application.data?.rated) {
      throw new BadRequestException(`Candidate is already rated by ${application.data.rated.by}`);
    }
    const updateDto: UpdateApplicationDto = {
      score: {
        ...application.score,
        experience: dto.experience,
        projectActivity: dto.projectActivity,
        about: dto.about,
      },
      data: {
        ...application.data,
        rated: {
          by: user.email,
          on: new Date().toISOString(),
        },
      },
      status: ApplicationStatus.WAIT_FOR_TRAINING,
    };
    await this.applicationService.update({ user, internship }, updateDto);
  }

  @Get(':id')
  @Roles(Role.CURATOR)
  @ApiOperation({ summary: 'Get a particular candidate with application for running internship' })
  @ApiOkResponse({ type: ResponseCandidateDto })
  @ApiNotFoundResponse()
  async getCandidateApplication(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ): Promise<ResponseCandidateDto> {
    const user = await this.usersService.findOneById(id);
    const internship = await this.internshipService.findCurrent();
    const userProfile = await this.userProfileService.findOne({ user });
    const candidateProfile = await this.candidateInfoService.findOne({ user });
    const application = await this.applicationService.findOne({ user, internship });
    return ResponseCandidateDto.buildFrom(user, userProfile, candidateProfile, application);
  }

  @Get('')
  @Roles(Role.CURATOR)
  @ApiOperation({ summary: 'Get all candidates with applications for running internship' })
  @ApiOkResponse({ type: Array<ResponseCandidateDto> })
  @ApiNotFoundResponse()
  @ApiQuery({
    name: 'status',
    enum: ApplicationStatus,
    description: 'Status to filter. Default: moderation',
    required: false,
  })
  async getCandidatesApplications(
    @Query('status', new DefaultValuePipe(ApplicationStatus.MODERATION), new ParseEnumPipe(ApplicationStatus))
    status?: ApplicationStatus,
  ): Promise<Array<ResponseCandidateDto>> {
    const internship = await this.internshipService.findCurrent();
    const applications = await this.applicationService.findAll({ internship, status });
    const result: ResponseCandidateDto[] = [];
    for (const application of applications) {
      const user = application.user;
      /**
       * TODO nested sub queries are not optimal in terms of performance.
       * Need to add a JOIN property to the application model so it join profiles automatically.
       */
      const userProfile = await this.userProfileService.findOne({ user });
      const candidateProfile = await this.candidateInfoService.findOne({ user });
      result.push(ResponseCandidateDto.buildFrom(user, userProfile, candidateProfile, application));
    }
    return result;
  }

  @Post(':id/application/move')
  @Roles(Role.CURATOR)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Warning! Temporary added operation', deprecated: true })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async moveCandidateApplication(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() dto: TmpMoveApplicationDto,
  ): Promise<void> {
    const user = await this.usersService.findOneById(id);
    const internship = await this.internshipService.findCurrent();
    const application = await this.applicationService.findOne({ user, internship });
    switch (dto.status) {
      case ApplicationStatus.TRAINING:
        if (application.status !== ApplicationStatus.WAIT_FOR_TRAINING) {
          throw new BadRequestException(`Cannot promote candidate to TRAINING from a non-WAIT_FOR_TRAINING status`);
        }
        await this.applicationService.update({ user, internship }, { status: ApplicationStatus.TRAINING });
        break;
      case ApplicationStatus.EXAMINATION:
        if (application.status !== ApplicationStatus.TRAINING) {
          throw new BadRequestException(`Cannot promote candidate to EXAMINATION from a non-TRAINING status`);
        }
        await this.applicationService.update(
          { user, internship },
          {
            status: ApplicationStatus.EXAMINATION,
            score: {
              ...application.score,
              examination: dto.examination,
            },
          },
        );
        break;
      case ApplicationStatus.CHAMPIONSHIP:
        if (application.status !== ApplicationStatus.EXAMINATION) {
          throw new BadRequestException(`Cannot promote candidate to CHAMPIONSHIP from a non-EXAMINATION status`);
        }
        await this.applicationService.update({ user, internship }, { status: ApplicationStatus.CHAMPIONSHIP });
        break;
      default:
        break;
    }
  }

  @Post(':id/application/promote')
  @Roles(Role.CURATOR)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admits or denies an internship to a candidate' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async promoteCandidateApplication(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() dto: PromoteCandidateDto,
  ): Promise<void> {
    const user = await this.usersService.findOneById(id);
    const internship = await this.internshipService.findCurrent();
    const application = await this.applicationService.findOne({ user, internship });
    if (application.status !== ApplicationStatus.CHAMPIONSHIP) {
      throw new BadRequestException('The championship is not taking place at the moment.');
    }
    await this.applicationService.update(
      { user, internship },
      {
        status: ApplicationStatus.COMPLETED,
        score: {
          ...application.score,
          championship: dto.championship,
        },
        data: {
          ...application.data,
          ...(dto.admitted
            ? {
                accepted: {
                  by: user.email,
                  on: new Date().toISOString(),
                },
              }
            : {
                rejectedOn: ApplicationStatus.CHAMPIONSHIP,
                rejectionReason: this.configService.get('application.championship.rejectionReason'),
              }),
        },
      },
    );
  }
}
