// repositories/product.repository.ts
import type { Product } from '../models/product.js'; // [No verificado] ajusta la ruta si difiere
import type { ProductRepositoryPort } from './product.repository.port.js'; // [No verificado]
import { pool } from '../db/mysql';

type Estado = 'activo' | 'inactivo';

function mapRow(row: any): Product {
  return {
    id: Number(row.id),
    name: row.name,
    price: Number(row.price),     // DECIMAL -> number
    stock: Number(row.stock),
    estado: row.estado as Estado,
  };
}

class ProductRepository implements ProductRepositoryPort {
  async getAll(): Promise<Product[]> {
    const [rows] = await pool.query(
      'SELECT id, name, price, stock, estado FROM products ORDER BY id DESC'
    );
    return (rows as any[]).map(mapRow);
  }

  async getById(id: number): Promise<Product | undefined> {
    const [rows] = await pool.query(
      'SELECT id, name, price, stock, estado FROM products WHERE id = ? LIMIT 1',
      [id]
    );
    const list = rows as any[];
    return list[0] ? mapRow(list[0]) : undefined;
  }

  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    const { name, price, stock, estado } = productData;

    const [res] = await pool.execute(
      'INSERT INTO products (name, price, stock, estado) VALUES (?, ?, ?, ?)',
      [name, price, stock, estado]
    );

    const insertId = (res as any).insertId as number;
    return { id: insertId, name, price, stock, estado };
  }

  async update(
    id: number,
    productUpdate: Partial<Omit<Product, 'id'>>
  ): Promise<Product | undefined> {
    // Mantener la lógica: tomar el actual y “mergear” lo nuevo
    const current = await this.getById(id);
    if (!current) return undefined;

    const updated: Product = {
      id: current.id,
      name: productUpdate.name ?? current.name,
      price: productUpdate.price ?? current.price,
      stock: productUpdate.stock ?? current.stock,
      estado: (productUpdate.estado ?? current.estado) as Estado,
    };

    // Actualizamos todos los campos (o podrías construir SET dinámico si lo prefieres)
    await pool.execute(
      'UPDATE products SET name = ?, price = ?, stock = ?, estado = ? WHERE id = ?',
      [updated.name, updated.price, updated.stock, updated.estado, id]
    );

    return updated;
  }

  async delete(id: number): Promise<boolean> {
    const [res] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    return (res as any).affectedRows > 0;
  }
}

export default ProductRepository;
