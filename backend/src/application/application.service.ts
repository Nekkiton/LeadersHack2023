import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { CUService } from 'src/utils/CUService';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Internship } from 'src/internship/entities/internship.entity.ts';
import * as dayjs from 'dayjs';
import { ApplicationScore } from './dto/application-score.dto';
import { ApplicationData } from './dto/application-data.dto';
import { ApplicationStatus } from './application-status/application-status.enum';

@Injectable()
export class ApplicationService extends CUService<
  Application,
  'user' | 'internship',
  CreateApplicationDto,
  UpdateApplicationDto
> {
  constructor(
    @InjectRepository(Application)
    repository: Repository<Application>,
  ) {
    super(Application, repository, {
      entityName: 'Application',
      identityKeys: ['user', 'internship'],
      relations: { user: true, internship: true },
    });
  }

  async createApplication(user: User, internship: Internship): Promise<Application> {
    if (dayjs().isBefore(internship.applicationStart)) {
      throw new BadRequestException('Applications are not accepted yet');
    }
    if (dayjs().isAfter(internship.applicationEnd)) {
      throw new BadRequestException('Applications are no longer accepted');
    }
    const score: ApplicationScore = {
      workSchedule: null,
      experience: null,
      projectActivity: null,
      about: null,
      training: null,
      championship: null,
    };
    const data: ApplicationData = {
      rejectedOn: null,
      rejectionReason: null,
    };
    const status = ApplicationStatus.MODERATION;
    return this.create({ user, internship }, { data, score, status });
  }
}
