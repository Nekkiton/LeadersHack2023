import { ApiProperty } from '@nestjs/swagger';
import { Organization } from '../entities/organization.entity';

export class ResponseOrganizationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  logo: string;

  static fromEntity(organization: Organization): ResponseOrganizationDto {
    return {
      name: organization.name,
      address: organization.address,
      phone: organization.phone,
      email: organization.email,
      logo: organization.logo,
    };
  }
}
