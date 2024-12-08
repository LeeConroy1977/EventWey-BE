// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module'; // Import UsersModule
import { User } from './users/user.entity';
import { Group } from './groups/group.entity';
import { Event } from './events/event.entity';
import { Message } from './messages/message.entity';
import { Notification } from './notifications/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Group, Event, Message, Notification], // Add other entities if needed
      synchronize: true,
    }),
    UsersModule, // Import UsersModule here
  ],
})
export class AppModule {}
