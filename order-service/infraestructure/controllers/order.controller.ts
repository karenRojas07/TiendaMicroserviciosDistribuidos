import { Request, Response } from "express";
import { OrderService } from "../../application/order.service";

export class OrderController {
  constructor(private service: OrderService) {}

  getOrders = async (req: Request, res: Response) => {
    const orders = await this.service.getAllOrders();
    res.json(orders);
  };

  getOrder = async (req: Request, res: Response) => {
    const order = await this.service.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  };

  createOrder = async (req: Request, res: Response) => {
    // 1. Validar los parámetros de entrada
    const { productId, quantity } = req.body;
    if (!productId || !quantity || typeof productId !== 'number' || typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ message: "Los parámetros de entrada son incorrectos o incompletos" });
    }

    try {
      // 2. Intentar crear la orden
      const order = await this.service.createOrder(req.body);
      res.status(201).json(order);
    } catch (error: any) {
      // 3. Manejar los errores
      if (error.message && error.message.includes('a foreign key constraint fails')) {
        // Si el productId no existe en la tabla de productos
        return res.status(404).json({ message: "El producto no esta disponible en el stock" });
      }
      
      // Para cualquier otro error
      console.error("Error al crear la orden:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  deleteOrder = async (req: Request, res: Response) => {
    const deleted = await this.service.deleteOrder(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  };
}
