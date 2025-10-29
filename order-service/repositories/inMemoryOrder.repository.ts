import { Order, OrderCreationAttributes } from '../models/orderEntity';
import { OrderRepository } from './order.repository.port';

export class SQLiteOrderRepository implements OrderRepository {
  async findAll(): Promise<Order[]> {
    return Order.findAll(); // Uso de Sequelize para obtener todas las órdenes
  }

  async findById(id: number): Promise<Order | null> {
    return Order.findByPk(id); // Buscar por clave primaria (id)
  }

  async create(order: OrderCreationAttributes): Promise<Order> {
    return Order.create(order); // Crear una nueva orden con el tipo adecuado
  }

  async delete(id: number): Promise<boolean> {
    const order = await Order.findByPk(id); // Buscar la orden
    if (order) {
      await order.destroy(); // Eliminar la orden
      return true;
    }
    return false;
  }
}
