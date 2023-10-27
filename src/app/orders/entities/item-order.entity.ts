import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Ticket } from 'src/app/tickets/entities/ticket.entity';

@Entity({ name: 'item_order' })
export class ItemOrder {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.itemOrder, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: Order;

  @ManyToOne(() => Ticket, (ticket) => ticket.itemOrder, {
    cascade: ['update'],
  })
  ticket: Ticket;
}
