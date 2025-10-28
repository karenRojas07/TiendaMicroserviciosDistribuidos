import { Order } from "../models/order";
import { OrderRepository } from "../repositories/order.repository.port";

export class OrderService {
  constructor(private repository: OrderRepository) {}

  async getAllOrders(): Promise<Order[]> {
    return this.repository.findAll();
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.repository.findById(Number(id));
  }

  async createOrder(order: Order): Promise<Order> {
    // Lógica de negocio: calcular total
    order.total = order.quantity * 100; // Simulando precio unitario de 100
    order.createdAt = new Date();
    return this.repository.create(order);
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.repository.delete(Number(id));
  }
}
