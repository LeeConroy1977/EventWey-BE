import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';
import { Group } from '../groups/group.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @ManyToOne(() => Event, (event) => event.notifications, { nullable: true })
  event: Event;

  @ManyToOne(() => Group, (group) => group.notifications, { nullable: true })
  group: Group;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
