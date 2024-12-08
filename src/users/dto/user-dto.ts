import {
  IsString,
  IsEmail,
  IsOptional,
  IsUrl,
  IsArray,
  IsEnum,
  Length,
  IsIn,
  IsObject,
  ValidateNested,
  IsInt,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventDto } from '../../events/dto/event-dto';
import { GroupDto } from '../../groups/dto/group-dto';
import { MessageDto } from '../../messages/dto/message-dto';
import { NotificationDto } from '../../notifications/dto/notification-dto';

export class UserDto {
  @IsNumber()
  id: number;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
  username: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid URL for profile image' })
  profileImage?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid URL for background image' })
  backgroundImage?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255, { message: 'Bio cannot exceed 255 characters' })
  bio?: string;

  @IsOptional()
  @IsString()
  aboutMe?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: 'Tags must be strings' })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupDto)
  userGroups?: GroupDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventDto)
  userEvents?: EventDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  messages?: MessageDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  receivedMessages?: MessageDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => NotificationDto)
  notifications?: NotificationDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  connections?: UserDto[];

  @IsOptional()
  @IsIn(['public', 'private', 'connections'], {
    message: 'Invalid viewEventsStatus value',
  })
  viewEventsStatus?: string;

  @IsOptional()
  @IsIn(['public', 'private', 'connections'], {
    message: 'Invalid viewConnectionsStatus value',
  })
  viewConnectionsStatus?: string;

  @IsOptional()
  @IsIn(['public', 'private', 'connections'], {
    message: 'Invalid viewGroupsStatus value',
  })
  viewGroupsStatus?: string;

  @IsOptional()
  @IsIn(['public', 'private', 'connections'], {
    message: 'Invalid viewTagsStatus value',
  })
  viewTagsStatus?: string;

  @IsOptional()
  @IsIn(['public', 'private', 'connections'], {
    message: 'Invalid viewProfileImage value',
  })
  viewProfileImage?: string;

  @IsOptional()
  @IsIn(['public', 'private', 'connections'], {
    message: 'Invalid viewBioStatus value',
  })
  viewBioStatus?: string;

  @IsOptional()
  @IsIn(['public', 'private', 'connections'], {
    message: 'Invalid aboutMeStatus value',
  })
  aboutMeStatus?: string;

  @IsOptional()
  @IsEnum(['user', 'admin'], { message: 'Invalid role' })
  role?: string;

  @IsOptional()
  @IsObject({ message: 'Event RSVP Status must be an object' })
  eventRsvpStatus?: Record<number, string>;
}
