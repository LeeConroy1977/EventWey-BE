import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsDateString,
  ValidateNested,
  IsDate,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user-dto';
import { EventDto } from '../../events/dto/event-dto';
import { GroupDto } from '../../groups/dto/group-dto';

export class NotificationDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Notification type is required' })
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Notification message cannot be empty' })
  message: string;

  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmpty({ message: 'User is required' })
  user: UserDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EventDto)
  event?: EventDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => GroupDto)
  group?: GroupDto;

  @IsBoolean({ message: 'Read status must be a boolean value' })
  read: boolean;

  @IsDate({ message: 'Created date must be a valid Date object' })
  @Type(() => Date)
  createdAt: Date;

  @IsDate({ message: 'Updated date must be a valid Date object' })
  @Type(() => Date)
  updatedAt: Date;
}
