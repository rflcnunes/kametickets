import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @IsNotEmpty()
  @IsNumber()
  buyerId: number;

  @IsNotEmpty()
  pricePaid: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
