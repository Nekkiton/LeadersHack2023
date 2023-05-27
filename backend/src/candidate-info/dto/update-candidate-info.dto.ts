import { PartialType } from '@nestjs/swagger';
import { CreateCandidateInfoDto } from './create-candidate-info.dto';

export class UpdateCandidateInfoDto extends PartialType(CreateCandidateInfoDto) {}
