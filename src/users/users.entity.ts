import { Accounts } from '../accounts/account.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: 'America/Sao_Paulo' })
  timezone: string;

  @Column({ nullable: true })
  photoUrl: string;

  @OneToOne(() => Accounts, (account) => account.user)
  account: Accounts;
}
