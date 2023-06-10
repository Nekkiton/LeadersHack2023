import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { ResponseUserProfileDto } from 'src/user-profiles/dto/response-user-profile.dto';
import { ResponseCandidateInfoDto } from 'src/candidate-info/dto/response-candidate-info.dto';
import { ResponseApplicationDto } from './response-application.dto';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { CandidateInfo } from 'src/candidate-info/entities/candidate-info.entity';
import { Application } from '../entities/application.entity';
import { User } from 'src/users/entities/user.entity';

export class ResponseCandidateDto {
  @ApiProperty()
  user: ResponseUserDto;

  @ApiProperty()
  userProfile: ResponseUserProfileDto;

  @ApiProperty()
  candidateProfile: ResponseCandidateInfoDto;

  @ApiProperty()
  application: ResponseApplicationDto;

  static buildFrom(
    user: User,
    userProfile: UserProfile,
    candidateProfile: CandidateInfo,
    application: Application,
  ): ResponseCandidateDto {
    return {
      user: ResponseUserDto.fromEntity(user),
      userProfile: ResponseUserProfileDto.fromEntity(userProfile),
      candidateProfile: ResponseCandidateInfoDto.fromEntity(candidateProfile),
      application: ResponseApplicationDto.fromEntity(application),
    };
  }
}
