import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 80)
  name: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  timezone?: string;
}
