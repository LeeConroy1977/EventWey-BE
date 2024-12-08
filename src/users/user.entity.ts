import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Group } from '../groups/group.entity';
import { Event } from '../events/event.entity';
import { Message } from '../messages/message.entity';
import { Notification } from '../notifications/notification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  backgroundImage: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  aboutMe: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @ManyToMany(() => User, (user) => user.connections)
  @JoinTable()
  connections: User[];

  @ManyToMany(() => Group, (group) => group.members, { cascade: true })
  @JoinTable()
  userGroups: Group[];

  @ManyToMany(() => Event, (event) => event.attendees, { cascade: true })
  @JoinTable()
  userEvents: Event[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

  @OneToMany(() => Notification, (notification) => notification.user, {
    cascade: true,
  })
  notifications: Notification[];

  @ManyToMany(() => Group, (group) => group.groupAdmin, { cascade: true })
  @JoinTable()
  groupAdmin: Group[];

  @Column({ default: 'public' })
  viewEventsStatus: string;

  @Column({ default: 'public' })
  viewConnectionsStatus: string;

  @Column({ default: 'public' })
  viewGroupsStatus: string;

  @Column({ default: 'public' })
  viewTagsStatus: string;

  @Column({ default: 'public' })
  viewProfileImage: string;

  @Column({ default: 'public' })
  viewBioStatus: string;

  @Column({ default: 'public' })
  aboutMeStatus: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 'user' })
  role: string;

  @Column('json', { nullable: true })
  eventRsvpStatus: Record<number, string>;
}
