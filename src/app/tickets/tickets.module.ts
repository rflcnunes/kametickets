import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { User } from '../users/entities/user.entity';
import { Event } from '../events/entities/event.entity';
import { TicketsService } from './tickets.service';
import { UsersService } from '../users/users.service';
import { EventsService } from '../events/events.service';
import { APP_FILTER } from '@nestjs/core';
import { GlobalHttpExceptionFilter } from 'src/interceptors/global-http-exception-filter.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, User, Event])],
  controllers: [TicketsController],
  providers: [
    TicketsService,
    UsersService,
    EventsService,
    {
      provide: APP_FILTER,
      useClass: GlobalHttpExceptionFilter,
    },
    ConsoleLogger,
  ],
})
export class TicketsModule {}
