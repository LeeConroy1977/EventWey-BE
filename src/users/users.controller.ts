import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { SignInDto } from './dto/sign-in-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(
      body.email,
      body.password,
      body.username,
    );
    return user;
  }

  @Post('signin')
  async signin(@Body() body: SignInDto) {
    const user = await this.authService.signin(body.email, body.password);

    return user;
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.removeUser(id);
  }
}
