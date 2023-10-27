import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { Event } from '../events/entities/event.entity';
import { UsersService } from '../users/users.service';
import { EventsService } from '../events/events.service';
import { OrderStatus } from './enums/order-status.enum';
import { TicketsService } from '../tickets/tickets.service';
import { CreateTicketDto } from '../tickets/dto/create-ticket.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(User)
    private userService: UsersService,

    @InjectRepository(Event)
    private eventService: EventsService,

    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    private ticketService: TicketsService,
  ) {}

  private async validateOrderData(orderData: CreateOrderDto, events: Event[]) {
    for (const item of orderData.orderItems) {
      const relatedProduct = events.find(
        (product) => product.id.toString() === item.eventId,
      );

      if (!relatedProduct) {
        throw new NotFoundException(`Event ${item.eventId} not found`);
      }

      if (relatedProduct.availableTickets < item.quantity) {
        const { eventName } = await this.eventService.findOne(+item.eventId);
        throw new NotFoundException(
          `Not enough tickets for event ${eventName} available`,
        );
      }
    }
  }

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.userService.findOne(+createOrderDto.userId);

    const events = await this.eventService.findByIds(
      createOrderDto.orderItems.map((item) => +item.eventId),
    );

    await this.validateOrderData(createOrderDto, events);

    const tickets = await Promise.all(
      createOrderDto.orderItems.map(async (item) => {
        const ticketDTO: CreateTicketDto = {
          eventId: +item.eventId,
          quantity: item.quantity,
          pricePaid: item.pricePaid,
          buyerId: +createOrderDto.userId,
        };

        return await this.ticketService.buyTicket(ticketDTO);
      }),
    );

    const itemOrders = await Promise.all(
      tickets.map(async (ticket, index) => {
        const itemOrder = await this.ticketService.createItemOrder(
          ticket,
          createOrderDto.orderItems[index].quantity,
        );
        return itemOrder;
      }),
    );

    const order = this.orderRepository.create({
      user,
      status: OrderStatus.PENDING,
    });

    itemOrders.forEach((itemOrder) => {
      itemOrder.order = order;
    });

    order.itemOrder = itemOrders;

    await this.orderRepository.save(order);
    await this.ticketRepository.save(tickets);

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: id },
      relations: ['user', 'itemOrder', 'itemOrder.ticket'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    order.status = updateOrderDto.status;

    await this.orderRepository.save(order);
    return order;
  }

  async remove(id: number): Promise<boolean> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
    return true;
  }
}
