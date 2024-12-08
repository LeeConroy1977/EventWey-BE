import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsString()
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
  username: string;
}
