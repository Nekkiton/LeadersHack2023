import { Organization } from 'src/organizations/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateEmployeeDto {
  user: User;
  organization: Organization;
}
