import { Order } from "../models/order";
import { OrderRepository } from "./order.repository.port";

export class InMemoryOrderRepository implements OrderRepository {
  private orders: Order[] = [];
  private nextId = 1;

  async findAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }

  async findById(id: number): Promise<Order | null> {
    const order = this.orders.find((o) => o.id === id);
    return Promise.resolve(order ?? null);
  }

  async create(order: Order): Promise<Order> {
    const newOrder = {
      ...order,
      id: this.nextId++,
    };
    this.orders.push(newOrder);
    return Promise.resolve(newOrder);
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.orders.length;
    this.orders = this.orders.filter((o) => o.id !== id);
    return Promise.resolve(this.orders.length < initialLength);
  }
}
