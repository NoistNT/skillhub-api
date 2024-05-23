import { IsBoolean, IsEmail, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  firstName!: string;

  @IsString()
  @Length(3, 20)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsUrl()
  image!: string;

  @IsBoolean()
  isActive!: boolean;

  @IsBoolean()
  isAdmin!: boolean;
}
