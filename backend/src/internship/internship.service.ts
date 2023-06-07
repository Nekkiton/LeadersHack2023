import { Injectable } from '@nestjs/common';
import { CUService } from 'src/utils/CUService';
import { Internship } from './entities/internship.entity.ts';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { UpdateInternshipDto } from './dto/update-internship.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionOptions } from 'src/utils/TransactionService.js';
import * as dayjs from 'dayjs';

@Injectable()
export class InternshipService extends CUService<Internship, 'year', CreateInternshipDto, UpdateInternshipDto> {
  constructor(
    @InjectRepository(Internship)
    repository: Repository<Internship>,
  ) {
    super(Internship, repository, { entityName: 'Internship', identityKeys: ['year'] });
  }

  findCurrent(transaction?: TransactionOptions) {
    const year = dayjs().year().toString();
    return this.findOne({ year }, transaction);
  }

  updateCurrent(dto: UpdateInternshipDto, transaction?: TransactionOptions) {
    const year = dayjs().year().toString();
    return this.update({ year }, dto, transaction);
  }
}
