import { Organization } from 'src/organizations/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['organization', 'user'])
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Organization)
  @JoinColumn()
  organization: Organization;
}
