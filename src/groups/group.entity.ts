import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';
import { Message } from '../messages/message.entity';
import { Notification } from '../notifications/notification.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.groupAdmin, {
    onDelete: 'CASCADE',
  })
  groupAdmin: User;

  @Column('simple-array')
  description: string[];

  @Column({ default: true })
  openAccess: boolean;

  @Column()
  category: string;

  @Column('simple-json', { nullable: true })
  location: {
    placename: string;
    address: string;
    city: string;
    lng: number;
    lat: number;
  };

  @CreateDateColumn()
  creationDate: Date;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @OneToMany(() => Event, (event) => event.group, { cascade: true })
  events: Event[];

  @ManyToMany(() => User, (user) => user.userGroups)
  @JoinTable()
  members: User[];

  @OneToMany(() => Message, (message) => message.group)
  messages: Message[];

  @OneToMany(() => Notification, (notification) => notification.group)
  notifications: Notification[];

  @UpdateDateColumn()
  updatedAt: Date;
}
