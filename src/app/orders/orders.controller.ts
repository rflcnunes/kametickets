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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiResponse } from 'src/common/api-response';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.CREATED,
      'Order created successfully',
      await this.ordersService.create(createOrderDto),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Orders fetched successfully',
      await this.ordersService.findAll(),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Order fetched successfully',
      await this.ordersService.findOne(+id),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Order updated successfully',
      await this.ordersService.update(+id, updateOrderDto),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Order deleted successfully',
      await this.ordersService.remove(+id),
    );
  }
}
