import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";
// status: pending, approved, rejected etc...
export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

@Column({
  type: "enum",
  enum: OrderStatus,
  default: OrderStatus.PENDING,
})
status: OrderStatus;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
