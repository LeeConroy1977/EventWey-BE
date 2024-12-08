import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Make sure TypeOrmModule is here
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
