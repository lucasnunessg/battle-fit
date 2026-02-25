import { User } from '../users/users.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('account')
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn({ name: 'userId' })
  user: User;
}
