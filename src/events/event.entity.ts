import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Group } from '../groups/group.entity';
import { Message } from '../messages/message.entity';
import { Notification } from '../notifications/notification.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column('bigint')
  date: number;

  @Column()
  startTime: string;

  @Column()
  title: string;

  @ManyToOne(() => Group, (group) => group.events)
  group: Group;

  @OneToMany(() => Message, (message) => message.event)
  messages: Message[];

  @OneToMany(() => Notification, (notification) => notification.event)
  notifications: Notification[];

  @Column('simple-json')
  duration: { value: number; unit: string };

  @Column()
  displayDuration: string;

  @ManyToMany(() => User, (user) => user.userEvents)
  @JoinTable()
  attendees: User[];

  @Column()
  capacity: number;

  @Column()
  availability: number;

  @Column()
  eventType: string;

  @Column({ default: true })
  free: boolean;

  @Column('simple-json')
  priceBands: { type: string; price: string; quantity: number }[];

  @Column()
  category: string;

  @Column('simple-array')
  tags: string[];

  @Column('simple-array')
  description: string[];

  @Column('simple-json')
  location: {
    placename: string;
    address: string;
    city: string;
    lng: number;
    lat: number;
  };
}
