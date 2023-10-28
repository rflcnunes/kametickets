import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiResponse } from 'src/common/api-response';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createTicketDto: CreateTicketDto): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.CREATED,
      'Ticket created successfully',
      await this.ticketsService.buyTicket(createTicketDto),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Tickets fetched successfully',
      await this.ticketsService.findAll(),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Ticket fetched successfully',
      await this.ticketsService.findOne(+id),
    );
  }

  @HttpCode(HttpStatus.OK)
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

  @HttpCode(HttpStatus.OK)
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
