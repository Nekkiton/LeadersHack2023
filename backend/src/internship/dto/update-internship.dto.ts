import { PartialType } from '@nestjs/swagger';
import { CreateInternshipDto } from './create-internship.dto';

export class UpdateInternshipDto extends PartialType(CreateInternshipDto) {}
