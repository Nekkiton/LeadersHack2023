import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
