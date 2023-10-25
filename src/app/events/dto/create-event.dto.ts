import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  eventName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  dateTime: Date;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  organizerId: number;

  @IsNotEmpty()
  @IsNumber()
  availableTickets: number;
}
