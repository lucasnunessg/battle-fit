import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { UpdateAccount } from './dto/update-account';

@Controller('account')
export class AccountController {
  constructor(private readonly accountS: AccountService) {}

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
