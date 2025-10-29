import { Order } from "./order";
import { OrderCreationAttributes } from "./models/orderEntity";

export interface OrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order | null>;
  create(order: OrderCreationAttributes): Promise<Order>;
  delete(id: number): Promise<boolean>;
}
