import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { ResponseInternshipDto } from './dto/response-internship.dto.js';
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
import { InternshipService } from './internship.service';
import { UpdateInternshipDto } from './dto/update-internship.dto';
import * as dayjs from 'dayjs';

@Controller('internships')
@Injectable()
@ApiTags('internships')
@ApiCookieAuth()
export class InternshipController {
  constructor(private internshipService: InternshipService) {}

  @Get()
  @ApiOperation({ summary: 'Get all internships' })
  @ApiOkResponse({ type: ResponseInternshipDto })
  @ApiNotFoundResponse()
  @Roles(Role.CURATOR) // ?
  async getAll(): Promise<ResponseInternshipDto[]> {
    const internships = await this.internshipService.findAll();
    return internships.map(ResponseInternshipDto.fromEntity, internships);
  }

  @Get('current')
  @ApiOperation({ summary: 'Get internship for this year' })
  @ApiOkResponse({ type: ResponseInternshipDto })
  @ApiNotFoundResponse()
  @Roles(Role.CURATOR, Role.STAFF, Role.MENTOR, Role.INTERN, Role.CANDIDATE)
  async getCurrentInternship(): Promise<ResponseInternshipDto> {
    const year = dayjs().year().toString();
    const internship = await this.internshipService.findOne({ year });
    return ResponseInternshipDto.fromEntity(internship);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get internship by id' })
  @ApiOkResponse({ type: ResponseInternshipDto })
  @ApiNotFoundResponse()
  @Roles(Role.CURATOR)
  async getInternshipById(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ): Promise<ResponseInternshipDto> {
    const internship = await this.internshipService.findOneById(id);
    return ResponseInternshipDto.fromEntity(internship);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates internship for this year' })
  @ApiCreatedResponse({ type: ResponseInternshipDto })
  @ApiBadRequestResponse()
  @Roles(Role.CURATOR)
  async createInternship(@Body() dto: CreateInternshipDto): Promise<ResponseInternshipDto> {
    const internship = await this.internshipService.create(dto);
    return ResponseInternshipDto.fromEntity(internship);
  }

  @Patch('current')
  @ApiOperation({ summary: 'Updates internship for this year' })
  @ApiOkResponse({ type: ResponseInternshipDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Roles(Role.CURATOR)
  async updateInternship(@Body() dto: UpdateInternshipDto): Promise<ResponseInternshipDto> {
    const year = dayjs().year().toString();
    const internship = await this.internshipService.update({ year }, dto);
    return ResponseInternshipDto.fromEntity(internship);
  }
}
