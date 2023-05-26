import { Role } from 'src/auth/roles/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 1000 })
  passwordHash: string;
}
