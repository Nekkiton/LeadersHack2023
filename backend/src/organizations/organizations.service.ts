import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CUService } from 'src/utils/CUService';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService extends CUService<
  Organization,
  'name',
  CreateOrganizationDto,
  UpdateOrganizationDto
> {
  constructor(
    @InjectRepository(Organization)
    repository: Repository<Organization>,
  ) {
    super(Organization, repository, { entityName: 'Organization', identityKeys: ['name'] });
  }
}
