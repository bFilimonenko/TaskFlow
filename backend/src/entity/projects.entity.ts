import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tasks } from './tasks.entity';

@Entity('projects')
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string;

  @Column()
  starts: Date;

  @Column()
  deadLine: Date;

  @Column()
  priority: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Tasks, (task) => task.project)
  tasks: Tasks[];
}
