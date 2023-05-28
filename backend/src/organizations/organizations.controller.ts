import { Controller, Get, Post, Body, Param, Injectable, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { ApiBadRequestResponse, ApiCookieAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ResponseOrganizationDto } from './dto/response-organization.dto';

@Controller('organizations')
@Injectable()
@ApiTags('organizations')
@ApiCookieAuth()
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates organization' })
  @ApiCreatedResponse({ type: ResponseOrganizationDto })
  @ApiBadRequestResponse()
  @Roles(Role.CURATOR)
  async create(@Body() dto: ResponseOrganizationDto): Promise<ResponseOrganizationDto> {
    const organization = await this.organizationsService.create(dto);
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
}
