import { ConsoleLogger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt-constants';
import { UsersModule } from '../users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalHttpExceptionFilter } from 'src/interceptors/global-http-exception-filter.interceptor';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '72h' },
        };
      },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_FILTER,
      useClass: GlobalHttpExceptionFilter,
    },
    ConsoleLogger,
  ],
})
export class AuthModule {}
