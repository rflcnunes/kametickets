import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiResponse } from 'src/common/api-response';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.CREATED,
      'Ticket created successfully',
      await this.ticketsService.buyTicket(createTicketDto),
    );
  }

  @Get()
  async findAll(): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Tickets fetched successfully',
      await this.ticketsService.findAll(),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Ticket fetched successfully',
      await this.ticketsService.findOne(+id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Ticket updated successfully',
      await this.ticketsService.update(+id, updateTicketDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Ticket deleted successfully',
      await this.ticketsService.remove(+id),
    );
  }
}
