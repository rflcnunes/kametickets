import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from 'src/app/users/entities/user.entity';
import { Ticket } from 'src/app/tickets/entities/ticket.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'event_name', nullable: false })
  eventName: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'date_time', nullable: false })
  dateTime: Date;

  @Column({ name: 'location', nullable: false })
  location: string;

  @Column({ name: 'available_tickets', nullable: false })
  availableTickets: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => User, (user) => user.events)
  organizer: User;

  @OneToMany(() => Ticket, (ticket) => ticket.event, {
    cascade: true,
  })
  tickets: Ticket[];
}
