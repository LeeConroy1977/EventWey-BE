import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.repo.find();
  }

  async findAllUsersByEmail(email: string): Promise<User[]> {
    return this.repo.find({ where: { email } });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.repo.findOne({ where: { email } });
  }

  async findUserById(id: number): Promise<User> {
    return this.repo.findOne({ where: { id } });
  }

  async createUser(
    email: string,
    password: string,
    username: string,
  ): Promise<User> {
    const user = this.repo.create({ email, password, username });
    return await this.repo.save(user);
  }

  async updateUser(id: number, attr: UpdateUserDto) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attr);
    return this.repo.save(user);
  }

  async removeUser(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
