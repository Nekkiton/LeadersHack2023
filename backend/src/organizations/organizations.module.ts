import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { EmployeeModule } from 'src/employee/employee.module';
import { UsersModule } from 'src/users/users.module';
import { ReferralsModule } from 'src/referrals/referrals.module';

@Module({
  imports: [TypeOrmModule.forFeature([Organization]), EmployeeModule, UsersModule, ReferralsModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
