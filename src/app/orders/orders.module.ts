import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { User } from '../users/entities/user.entity';
import { Event } from '../events/entities/event.entity';
import { UsersService } from '../users/users.service';
import { EventsService } from '../events/events.service';
import { TicketsService } from '../tickets/tickets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Event, Ticket])],
  controllers: [OrdersController],
  providers: [OrdersService, UsersService, EventsService, TicketsService],
})
export class OrdersModule {}
