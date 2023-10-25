import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from 'src/app/events/entities/event.entity';
import { Ticket } from 'src/app/tickets/entities/ticket.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  city: string;

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @OneToMany(() => Ticket, (ticket) => ticket.buyer)
  tickets: Ticket[];
}
