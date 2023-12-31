import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Event } from 'src/app/events/entities/event.entity';
import { ItemOrder } from 'src/app/orders/entities/item-order.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pricePaid: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => Event, (event) => event.tickets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  event: Event;

  @OneToMany(() => ItemOrder, (itemOrder) => itemOrder.ticket)
  itemOrder: ItemOrder[];
}
