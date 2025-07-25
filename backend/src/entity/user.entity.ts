import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../modules/auth/role.enum';
import { Tasks } from './tasks.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ default: false })
  isActive?: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role?: Role;

  @ManyToMany(() => Tasks, (task) => task.users)
  tasks: Tasks[];
}
