import { ConsoleLogger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { APP_FILTER } from '@nestjs/core';
import { GlobalHttpExceptionFilter } from 'src/interceptors/global-http-exception-filter.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_FILTER,
      useClass: GlobalHttpExceptionFilter,
    },
    ConsoleLogger,
  ],
  exports: [UsersService],
})
export class UsersModule {}
