import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account-dto';
import { UpdateAccount } from './dto/update-account';

@Controller('account')
export class AccountController {
  constructor(private readonly accountS: AccountService) {}

  @Post('create')
  create(@Body() dto: CreateAccountDto) {
    return this.accountS.create(dto, dto.email, dto.username);
  }

  @Patch(':id')
  update(@Param() id: number, @Body() dto: UpdateAccount) {
    return this.accountS.update(id, dto);
  }

  @Get(':id')
  getById(@Param() id: number) {
    return this.accountS.getId(id);
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.accountS.delete(id);
  }
}
