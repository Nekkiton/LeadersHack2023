import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkSchedule } from '../work-schedule/work-schedule.enum';
import { Education } from '../education/education.dto';
import { InternshipDirection } from '../direction/direction.enum';

@Entity()
export class CandidateInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: WorkSchedule,
  })
  workSchedule: WorkSchedule;

  @Column({ type: 'text', nullable: true })
  experience: string;

  @Column({ type: 'text', nullable: true })
  projectActivity: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({
    type: 'jsonb',
    transformer: {
      from: Education.fromDb,
      to: Education.toDb,
    },
  })
  education: Education;

  @Column({
    type: 'enum',
    enum: InternshipDirection,
  })
  internshipDirection: InternshipDirection;
}
