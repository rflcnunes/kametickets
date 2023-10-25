import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  ConsoleLogger,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from 'src/common/api-response';

@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: ConsoleLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const message = exception.getResponse() as string;
    const { method, url } = request;

    const loggerMessage = {
      method,
      url,
      status,
      data: message,
    };

    this.logger.error(JSON.stringify(loggerMessage));

    delete loggerMessage.method;

    const apiResponse = new ApiResponse(false, status, null, message);

    delete apiResponse.text;
    delete apiResponse.data.statusCode;

    response.status(status).json(apiResponse);
  }
}
