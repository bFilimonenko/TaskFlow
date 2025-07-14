import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Projects } from './projects.entity';
import { User } from './user.entity';

@Entity('tasks')
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column()
  estimate: number;

  @Column()
  deadLine: Date;

  @Column()
  priority: string;

  @Column({ default: 'To Do' })
  status: string;

  @ManyToMany(() => User, (user) => user.tasks)
  @JoinTable({ name: 'tasks_users' })
  users: User[];

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Projects, (project) => project.tasks)
  project: Projects;

  @Column()
  projectId: number;
}
