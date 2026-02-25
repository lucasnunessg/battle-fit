import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './account.entity';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts]), UserModule],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
