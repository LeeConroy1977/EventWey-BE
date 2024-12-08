import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string, username: string) {
    const users = await this.usersService.findAllUsersByEmail(email);

    if (users.length) {
      throw new BadRequestException('Email already in use');
    }

    const hash = await argon2.hash(password, { type: argon2.argon2id });

    const user = await this.usersService.createUser(email, hash, username);

    return user;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
