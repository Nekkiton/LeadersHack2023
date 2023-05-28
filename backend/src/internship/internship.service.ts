import { Injectable } from '@nestjs/common';
import { CUService } from 'src/utils/CUService';
import { Internship } from './entities/internship.entity.ts';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { UpdateInternshipDto } from './dto/update-internship.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InternshipService extends CUService<Internship, 'year', CreateInternshipDto, UpdateInternshipDto> {
  constructor(
    @InjectRepository(Internship)
    repository: Repository<Internship>,
  ) {
    super(Internship, repository, { entityName: 'Internship', identityKeys: ['year'] });
  }
}
