import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { IsNumber } from 'class-validator';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsNumber()
  pricePaid: number;

  @IsNumber()
  quantity: number;
}
