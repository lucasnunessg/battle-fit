import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { Accounts } from 'src/accounts/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { APIResponse } from 'src/accounts/types/ApiResponse';
import { SignUpDto } from './dto/signup-dto';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/accounts/types/Token';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountRepo: Repository<Accounts>,
    private readonly jwtService: JwtService,
  ) {}
  saltOrRounds = 10;

  async generateToken() {}

  async signUp(dto: SignUpDto): Promise<APIResponse> {
    const { password } = dto;
    const hash = await bcrypt.hash(password, this.saltOrRounds);

    const newA = this.accountRepo.create({ ...dto, password: hash });
    await this.accountRepo.save(newA);

    return {
      message: 'created succefully',
    };
  }

  async signIn(dto: LoginDto): Promise<APIResponse<Token>> {
    const login = await this.accountRepo.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });

    console.log('findOne: ', dto.username);

    if (!login) {
      throw new Error('invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, login.password);
    if (!isPasswordValid) {
      throw new Error('invalid credentials');
    }

    console.log('isPassword valid:', isPasswordValid);

    const payload = { sub: login.id, username: login.username };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successfully',
      data: { accessToken: token },
    };
  }
}
