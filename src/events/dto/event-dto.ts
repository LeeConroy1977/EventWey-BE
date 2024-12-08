import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsBoolean,
  IsObject,
  ValidateNested,
  IsIn,
  IsNotEmpty,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user-dto';
import { GroupDto } from '../../groups/dto/group-dto';
import { MessageDto } from '../../messages/dto/message-dto';
import { NotificationDto } from '../../notifications/dto/notification-dto';

export class EventDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Image URL is required' })
  image: string;

  @IsInt({ message: 'Date must be a valid timestamp' })
  date: number;

  @IsString({ message: 'Start time must be a valid string' })
  startTime: string;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => GroupDto)
  group?: GroupDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  messages?: MessageDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => NotificationDto)
  notifications?: NotificationDto[];

  @IsObject({ message: 'Duration must be a valid object' })
  duration: { value: number; unit: string };

  @IsString()
  displayDuration: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  attendees?: UserDto[];

  @IsNumber()
  capacity: number;

  @IsNumber()
  availability: number;

  @IsString()
  @IsIn(['online', 'in-person'], {
    message: 'Event type must be "online" or "in-person"',
  })
  eventType: string;

  @IsBoolean({ message: 'Free must be a boolean value' })
  free: boolean;

  @IsArray()
  @IsObject({ each: true, message: 'PriceBands must be an array of objects' })
  priceBands: { type: string; price: string; quantity: number }[];

  @IsString()
  category: string;

  @IsArray()
  @IsString({ each: true, message: 'Tags must be strings' })
  tags: string[];

  @IsArray()
  @IsString({ each: true, message: 'Description must be an array of strings' })
  description: string[];

  @IsObject({ message: 'Location must be a valid object' })
  location: {
    placename: string;
    address: string;
    city: string;
    lng: number;
    lat: number;
  };
}
