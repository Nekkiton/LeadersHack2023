import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateCandidateInfoDto } from 'src/candidate-info/dto/create-candidate-info.dto';
import { CreateUserProfileDto } from 'src/user-profiles/dto/create-user-profile.dto';

export class CandidateApplicationDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateUserProfileDto)
  userProfile?: CreateUserProfileDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateCandidateInfoDto)
  candidateProfile?: CreateCandidateInfoDto;
}
