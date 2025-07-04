import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
