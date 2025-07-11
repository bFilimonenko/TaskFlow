import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tasks } from './tasks.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ default: false })
  isActive?: boolean;

  @ManyToMany(() => Tasks, (task) => task.users)
  tasks: Tasks[];
}
