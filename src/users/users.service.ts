import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const { timezone, phone, ...userData } = dto;

    const phoneAlrearyExists = await this.userRepository.exists({
      where: { phone },
    });
    if (phoneAlrearyExists) {
      throw new ConflictException('este numero de telefone já existe');
    }

    const newUser = this.userRepository.create({
      ...userData,
      phone,
      timezone: timezone ?? 'America/Sao_Paulo',
    });

    return this.userRepository.save(newUser);
  }

  async get() {
    return await this.userRepository.find();
  }

  async getId(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
}
