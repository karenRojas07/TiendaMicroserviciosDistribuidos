import { Order } from "../models/order";
import { OrderRepository } from "./order.repository.port";
import { pool } from "../db/mysql";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamelCase(v));
  }
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());
      result[camelKey] = toCamelCase(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
}


export class MySqlOrderRepository implements OrderRepository {
  async findAll(): Promise<Order[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM orders");
    return toCamelCase(rows) as Order[];
  }

  async findById(id: number): Promise<Order | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM orders WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return null;
    }
    return toCamelCase(rows[0]) as Order;
  }

  
  async create(order: Order): Promise<Order> {
    const { id, productId, createdAt, ...rest } = order;

    const orderForDb = {
      ...rest,
      product_id: productId,
    };

    const fields = Object.keys(orderForDb);
    const values = Object.values(orderForDb);

    const placeholders = fields.map(() => "?").join(",");
    const sql = `INSERT INTO orders (${fields.join(",")}) VALUES (${placeholders})`;

    const [result] = await pool.query<ResultSetHeader>(sql, values);
    
    return { ...order, id: result.insertId };
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM orders WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
