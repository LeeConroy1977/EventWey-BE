import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsObject,
  ValidateNested,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user-dto';
import { EventDto } from '../../events/dto/event-dto';
import { MessageDto } from '../../messages/dto/message-dto';
import { NotificationDto } from '../../notifications/dto/notification-dto';

export class GroupDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Group name is required' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Image must be a valid string' })
  image?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  groupAdmin?: UserDto;

  @IsArray()
  @IsString({ each: true, message: 'Description must be an array of strings' })
  description: string[];

  @IsBoolean({ message: 'OpenAccess must be a boolean value' })
  openAccess: boolean;

  @IsString()
  category: string;

  @IsOptional()
  @IsObject({ message: 'Location must be a valid object' })
  location?: {
    placename: string;
    address: string;
    city: string;
    lng: number;
    lat: number;
  };

  @IsString()
  creationDate: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: 'Tags must be strings' })
  tags?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EventDto)
  events?: EventDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  members?: UserDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  messages?: MessageDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => NotificationDto)
  notifications?: NotificationDto[];

  @IsString()
  updatedAt: Date;
}
