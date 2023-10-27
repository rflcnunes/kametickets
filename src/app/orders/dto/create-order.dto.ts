import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ItemOrderDto {
  @IsString()
  eventId: string;

  @IsInt()
  quantity: number;

  @IsInt()
  pricePaid: number;
}

export class CreateOrderDto {
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemOrderDto)
  orderItems: ItemOrderDto[];

  @IsString()
  userId: string;
}
