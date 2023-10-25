import { ConsoleLogger, Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/app/events/entities/event.entity';
import { User } from '../users/entities/user.entity';
import { APP_FILTER } from '@nestjs/core';
import { GlobalHttpExceptionFilter } from 'src/interceptors/global-http-exception-filter.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User])],
  controllers: [EventsController],
  providers: [
    EventsService,
    {
      provide: APP_FILTER,
      useClass: GlobalHttpExceptionFilter,
    },
    ConsoleLogger,
  ],
})
export class EventsModule {}
