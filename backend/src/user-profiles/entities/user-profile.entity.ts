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
  citizenship: string;

  @Column({ length: 1000 })
  location: string;

  @Column({ length: 255 })
  phone: string;

  @Column({ length: 1000, nullable: true })
  photo: string;
}
