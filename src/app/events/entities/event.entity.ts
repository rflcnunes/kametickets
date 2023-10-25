import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/app/users/entities/user.entity';
import { Ticket } from 'src/app/tickets/entities/ticket.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventName: string;

  @Column()
  description: string;

  @Column()
  dateTime: Date;

  @Column()
  location: string;

  @Column()
  availableTickets: number;

  @ManyToOne(() => User, (user) => user.events)
  organizer: User;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];
}
