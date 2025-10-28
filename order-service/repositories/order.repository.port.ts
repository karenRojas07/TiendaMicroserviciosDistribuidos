import { Order } from "../models/order";

export interface OrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order | null>;
  create(order: Order): Promise<Order>;
  delete(id: number): Promise<boolean>;
}
