import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthService } from './users/auth.service';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { EventsModule } from './events/events.module';
import { GroupsModule } from './groups/groups.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationsModule } from './notifications/notifications.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: 'db.sqlite',
          entities: [User],
          synchronize: true,
        };
      },
    }),

    UsersModule,

    EventsModule,

    GroupsModule,

    MessagesModule,

    NotificationsModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
