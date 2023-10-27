import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { EventsService } from '../events/events.service';
import { Repository } from 'typeorm';
import { ItemOrder } from '../orders/entities/item-order.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    private eventsService: EventsService,
  ) {}

  private async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
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
      relations: ['event'],
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    const event = await this.eventsService.findOne(updateTicketDto.eventId);
    const ticketUpdated = this.ticketRepository.merge(ticket, {
      ...updateTicketDto,
      event,
    });

    return this.ticketRepository.save(ticketUpdated);
  }

  async remove(id: number): Promise<boolean> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.delete(ticket.id);
    return true;
  }

  async createItemOrder(ticket: Ticket, quantity: number): Promise<ItemOrder> {
    const itemOrder = new ItemOrder();
    itemOrder.quantity = quantity;
    itemOrder.order = null; // O pedido será associado após a criação do pedido
    itemOrder.ticket = ticket;

    return itemOrder;
  }
}
