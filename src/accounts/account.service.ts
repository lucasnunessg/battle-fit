import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from './account.entity';
import { Repository } from 'typeorm';
import { APIResponse } from './types/ApiResponse';
import { UpdateAccount } from './dto/update-account';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountRepo: Repository<Accounts>,
  ) {}

  async findByUsername(username: string): Promise<APIResponse<Accounts>> {
    const account = await this.accountRepo.findOne({ where: { username } });
    if (!account) {
      throw new UnauthorizedException('invalid credentials');
    }

    return {
      message: 'user found',
      data: account,
    };
  }

  async getId(accountId: number): Promise<APIResponse<Accounts>> {
    const account = await this.accountRepo.findOne({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException('user not found');
    }

    return {
      message: 'user found',
      data: account,
    };
  }

  async update(accountId: number, dto: UpdateAccount): Promise<APIResponse> {
    //update n retorna user, retorna UpdateREsult
    const newAccount = await this.accountRepo.update(accountId, dto);
    if (newAccount.affected === 0) {
      throw new NotFoundException('update failed');
    }

    return {
      message: 'updated succefully',
    };
  }

  async delete(accountId: number): Promise<APIResponse> {
    const deleteA = await this.accountRepo.delete(accountId);
    if (deleteA.affected === 0) {
      throw new NotFoundException('error');
    }

    return {
      message: 'deleted successfully',
    };
  }
}
