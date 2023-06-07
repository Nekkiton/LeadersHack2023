import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Injectable,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Logger,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ResponseOrganizationDto } from './dto/response-organization.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ReferralsService } from 'src/referrals/referrals.service';
import { UsersService } from 'src/users/users.service';
import { EntityManager } from 'typeorm';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';

@Controller('organizations')
@Injectable()
@ApiTags('organizations')
@ApiCookieAuth()
export class OrganizationsController {
  private readonly logger = new Logger(OrganizationsController.name);

  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly employeeService: EmployeeService,
    private userService: UsersService,
    private referralService: ReferralsService,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates organization' })
  @ApiCreatedResponse({ type: ResponseOrganizationDto })
  @ApiBadRequestResponse()
  @Roles(Role.CURATOR)
  async create(@Body() dto: CreateOrganizationDto): Promise<ResponseOrganizationDto> {
    const organization = await this.organizationsService.create({ name: dto.name }, dto);
    return ResponseOrganizationDto.fromEntity(organization);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiOkResponse({ type: ResponseOrganizationDto })
  @ApiNotFoundResponse()
  @Roles(Role.CURATOR)
  async getAll(): Promise<ResponseOrganizationDto[]> {
    const organization = await this.organizationsService.findAll();
    return organization.map(ResponseOrganizationDto.fromEntity, organization);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization with specific id' })
  @ApiOkResponse({ type: ResponseOrganizationDto })
  @ApiNotFoundResponse()
  @Roles(Role.CURATOR)
  async getOrganizationById(@Param('id', new ParseUUIDPipe()) id: string): Promise<ResponseOrganizationDto> {
    const organization = await this.organizationsService.findOneById(id);

    return ResponseOrganizationDto.fromEntity(organization);
  }

  @Post(':id/invite/mentor')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Invites mentor to the organization' })
  @ApiBadRequestResponse()
  @Roles(Role.CURATOR)
  async inviteMentor(
    @Body() dto: RegisterUserDto,
    @Param('id', new ParseUUIDPipe()) organizationId: string,
  ): Promise<void> {
    await this.entityManager.transaction(async (entityManager) => {
      const organization = await this.organizationsService.findOneById(organizationId, { entityManager });
      const { user, password } = await this.userService.register(dto, Role.MENTOR, { entityManager });
      const referral = await this.referralService.createReferral(user, { entityManager });
      await this.employeeService.create({ user, organization }, { user, organization }, { entityManager });
      // TODO send email instead
      this.logger.log(
        `Invited "${dto.email}" referral=${referral.referralId}` + (dto.password ? '' : ` password=${password}`),
      );
    });
  }

  @Post(':id/invite/staff')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Invites staff to the organization' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Roles(Role.CURATOR)
  async inviteStaff(
    @Body() dto: RegisterUserDto,
    @Param('id', new ParseUUIDPipe()) organizationId: string,
  ): Promise<void> {
    await this.entityManager.transaction(async (entityManager) => {
      const organization = await this.organizationsService.findOneById(organizationId, { entityManager });
      const { user, password } = await this.userService.register(dto, Role.STAFF, { entityManager });
      const referral = await this.referralService.createReferral(user, { entityManager });
      await this.employeeService.create({ user, organization }, { user, organization }, { entityManager });
      // TODO send email instead
      this.logger.log(
        `Invited "${dto.email}" referral=${referral.referralId}` + (dto.password ? '' : ` password=${password}`),
      );
    });
  }
}
