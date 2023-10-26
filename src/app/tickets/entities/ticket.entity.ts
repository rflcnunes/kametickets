import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/app/users/entities/user.entity';
import { Event } from 'src/app/events/entities/event.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pricePaid: number;

  @ManyToOne(() => User, (user) => user.tickets)
  buyer: User;

  @ManyToOne(() => Event, (event) => event.tickets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  event: Event;
}
