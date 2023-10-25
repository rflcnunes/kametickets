import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiResponse } from 'src/common/api-response';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.CREATED,
      'Event created successfully',
      await this.eventsService.create(createEventDto),
    );
  }

  @Get()
  async findAll(): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Events fetched successfully',
      await this.eventsService.findAll(),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Event fetched successfully',
      await this.eventsService.findOne(+id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Event updated successfully',
      await this.eventsService.update(+id, updateEventDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse> {
    await this.eventsService.remove(+id);
    return new ApiResponse(true, HttpStatus.OK, 'Event deleted successfully');
  }
}
