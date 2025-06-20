import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  validFrom: Date;

  @Column()
  validUntil: Date;

  @Column()
  refreshToken: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}