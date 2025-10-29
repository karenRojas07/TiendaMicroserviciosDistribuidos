import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { OrderService } from "../service/order.service";
import {  SQLiteOrderRepository } from "../repositories/inMemoryOrder.repository";
const router = Router();

const repository = new SQLiteOrderRepository();
const service = new OrderService(repository);
const controller = new OrderController(service);

router.get("/", controller.getOrders);
router.get("/:id", controller.getOrder);
router.post("/", controller.createOrder);
router.delete("/:id", controller.deleteOrder);

export default router;
