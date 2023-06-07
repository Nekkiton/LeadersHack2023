import { Internship } from 'src/internship/entities/internship.entity.ts';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApplicationStatus } from '../application-status/application-status.enum';
import { ApplicationScore } from '../dto/application-score.dto';
import { ApplicationData } from '../dto/application-data.dto';

@Entity()
@Unique(['user', 'internship'])
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Internship)
  @JoinColumn()
  internship: Internship;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
  })
  status: ApplicationStatus;

  @Column({
    type: 'jsonb',
    transformer: {
      from: ApplicationScore.fromDb,
      to: ApplicationScore.toDb,
    },
  })
  score: ApplicationScore;

  @Column({
    type: 'jsonb',
    transformer: {
      from: ApplicationData.fromDb,
      to: ApplicationData.toDb,
    },
  })
  data: ApplicationData;
}
