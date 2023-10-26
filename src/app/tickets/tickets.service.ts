import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { UsersService } from '../users/users.service';
import { EventsService } from '../events/events.service';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    private usersService: UsersService,
    private eventsService: EventsService,
  ) {}

  private async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const buyer = await this.usersService.findOne(createTicketDto.buyerId);
    const event = await this.eventsService.findOne(createTicketDto.eventId);

    if (
      event.availableTickets <= 0 ||
      event.availableTickets < createTicketDto.quantity
    ) {
      throw new NotFoundException(
        'Not enough tickets available for this event',
      );
    }

    event.availableTickets -= createTicketDto.quantity;
    await this.eventsService.update(createTicketDto.eventId, {
      availableTickets: event.availableTickets,
    });

    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      buyer,
      event,
    });

    return this.ticketRepository.save(ticket);
  }

  async buyTicket(ticketDTO: CreateTicketDto): Promise<Ticket> {
    return this.create(ticketDTO);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id: id },
      relations: ['buyer', 'event'],
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    const buyer = await this.usersService.findOne(updateTicketDto.buyerId);
    const event = await this.eventsService.findOne(updateTicketDto.eventId);
    const ticketUpdated = this.ticketRepository.merge(ticket, {
      ...updateTicketDto,
      buyer,
      event,
    });

    return this.ticketRepository.save(ticketUpdated);
  }

  async remove(id: number): Promise<boolean> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.delete(ticket.id);
    return true;
  }
}
