import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  surname: string;

  @Column({ length: 255 })
  patronymic: string;

  @Column({ length: 255 })
  residency: string;

  @Column({ length: 255, nullable: true })
  photo: string;
}
