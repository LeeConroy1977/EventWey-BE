import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsDateString,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user-dto';
import { EventDto } from '../../events/dto/event-dto';
import { GroupDto } from '../../groups/dto/group-dto';

export class MessageDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Content cannot be empty' })
  content: string;

  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmpty({ message: 'Sender is required' })
  sender: UserDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  receiver?: UserDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EventDto)
  event?: EventDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => GroupDto)
  group?: GroupDto;

  @IsBoolean({ message: 'isRead must be a boolean value' })
  isRead: boolean;

  @IsDate({ message: 'createdAt must be a valid Date object' })
  @Type(() => Date)
  createdAt: Date;

  @IsDate({ message: 'updatedAt must be a valid Date object' })
  @Type(() => Date)
  updatedAt: Date;
}
