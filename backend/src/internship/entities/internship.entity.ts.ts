import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['year'])
export class Internship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 4 })
  year: string;

  @Column({ type: 'date' })
  applicationStart: string;

  @Column({ type: 'date' })
  applicationEnd: string;

  @Column({ type: 'date' })
  trainingStart: string;

  @Column({ type: 'date' })
  trainingEnd: string;

  @Column({ length: 2048 })
  trainingLink: string;

  @Column({ type: 'date' })
  examStart: string;

  @Column({ type: 'date' })
  examEnd: string;

  @Column({ length: 2048 })
  examLink: string;

  @Column({ type: 'date' })
  championshipStart: string;

  @Column({ type: 'date' })
  championshipEnd: string;

  @Column({ length: 2048 })
  championshipLink: string;

  @Column({ type: 'date' })
  distributionStart: string;

  @Column({ type: 'date' })
  distributionEnd: string;

  @Column({ type: 'date' })
  sprintOneStart: string;

  @Column({ type: 'date' })
  sprintOneEnd: string;

  @Column({ type: 'date' })
  sprintTwoStart: string;

  @Column({ type: 'date' })
  sprintTwoEnd: string;

  @Column({ type: 'date' })
  sprintThreeStart: string;

  @Column({ type: 'date' })
  sprintThreeEnd: string;
}
