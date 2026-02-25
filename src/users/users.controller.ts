import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { EditUserDto } from './dto/edit-user-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  edit(@Param() id: number, @Body() dto: EditUserDto) {
    return this.userService.edit(id, dto);
  }

  @Delete(':id')
  deleteUser(@Param() id: number) {
    return this.userService.delete(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  getAll() {
    return this.userService.get();
  }

  @Get(':id')
  getbyId(@Param() id: number) {
    return this.userService.getId(id);
  }
}
