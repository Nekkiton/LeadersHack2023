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
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
import { CandidateInfo } from 'src/candidate-info/entities/candidate-info.entity';

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
    private configService: ConfigService,
  ) {
    super(Application, repository, {
      entityName: 'Application',
      identityKeys: ['user', 'internship'],
      relations: { user: true, internship: true },
    });
  }

  async createApplication(
    user: User,
    userProfile: UserProfile,
    candidateProfile: CandidateInfo,
    internship: Internship,
  ): Promise<Application> {
    if (dayjs().isBefore(internship.applicationStart)) {
      throw new BadRequestException('Applications are not accepted yet');
    }
    if (dayjs().isAfter(internship.applicationEnd)) {
      throw new BadRequestException('Applications are no longer accepted');
    }
    const validation = this.validateUser(userProfile);
    const autoScore = this.calculateAutoScore(candidateProfile);
    const score: ApplicationScore = {
      workSchedule: null,
      experience: null,
      projectActivity: null,
      about: null,
      examination: null,
      championship: null,
      ...autoScore,
    };
    const data: ApplicationData = {
      ...ApplicationData.getDefault(),
      ...(validation.valid
        ? {}
        : {
            rejectedOn: ApplicationStatus.MODERATION,
            rejectionReason: validation.rejectionReason,
          }),
    };
    const status = validation.valid ? ApplicationStatus.MODERATION : ApplicationStatus.COMPLETED;
    return this.create({ user, internship }, { data, score, status });
  }

  private matchConstraint(value: any, constraint: Gb.Constraint): boolean {
    switch (constraint.operation) {
      case 'isAgeBetween':
        const age = dayjs().diff(value, 'years');
        const [min, max] = constraint.values;
        return age >= min && age <= max;
      case 'isIncludedIn':
        return constraint.values.includes(value);
      default:
        // TODO better flow
        console.error(`Check for "${JSON.stringify(constraint)}" constraint operation is not implemented`);
        return true;
    }
  }

  private validateUser(userProfile: UserProfile): { valid: boolean; rejectionReason?: string } {
    const moderation: { [property: string]: Gb.ModerationValidate } = this.configService.get('application.moderation');
    for (const [property, rule] of Object.entries(moderation)) {
      if (_.has(userProfile, property)) {
        const value = userProfile[property];
        const matched = this.matchConstraint(value, rule.constraint);
        if (!matched) {
          return { valid: false, rejectionReason: rule.rejectionReason };
        }
      }
    }
    return { valid: true };
  }

  private calculateAutoScore(candidateProfile: CandidateInfo): { [property: string]: number } {
    const result = {};
    const autoScore: { [property: string]: Gb.AutoScore } = this.configService.get('application.autoScore');
    for (const [property, rule] of Object.entries(autoScore)) {
      if (_.has(candidateProfile, property)) {
        const value = candidateProfile[property];
        const matched = this.matchConstraint(value, rule.constraint);
        if (matched) {
          result[property] = rule.score;
        }
      }
    }
    return result;
  }
}
