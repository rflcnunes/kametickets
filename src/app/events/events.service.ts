import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  private async findOrganizer(organizerId: number): Promise<User> {
    const organizer = await this.usersRepository.findOne({
      where: { id: organizerId },
    });

    if (!organizer) {
      throw new NotFoundException('Organizer not found');
    }

    return organizer;
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const organizer = await this.findOrganizer(createEventDto.organizerId);
    const event = this.eventsRepository.create({
      ...createEventDto,
      organizer,
    });

    return this.eventsRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({
      where: { id: id },
      relations: ['organizer'],
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);
    const organizer = await this.findOrganizer(updateEventDto.organizerId);
    const eventUpdated = this.eventsRepository.merge(event, {
      ...updateEventDto,
      organizer,
    });

    return this.eventsRepository.save(eventUpdated);
  }

  async remove(id: number): Promise<boolean> {
    const event = await this.findOne(id);
    await this.eventsRepository.remove(event);
    return true;
  }

  async findByIds(ids: number[]): Promise<Event[]> {
    const events = [];

    for (const id of ids) {
      const event = await this.findOne(id);

      events.push(event);
    }

    return events;
  }
}
