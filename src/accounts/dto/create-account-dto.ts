import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  username: string;

  @MinLength(5)
  @MaxLength(25)
  @IsString()
  password: string;

  @IsEmail()
  @IsString()
  email: string;
}
