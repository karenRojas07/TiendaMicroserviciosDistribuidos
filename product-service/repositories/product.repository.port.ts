// Puerto de salida (Output Port): Define la interfaz para el repositorio
import type { Product } from '../models/product';

export interface ProductRepositoryPort {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | undefined>;
  create(product: Omit<Product, 'id'>): Promise<Product>;
  update(id: number, product: Partial<Omit<Product, 'id'>>): Promise<Product | undefined>;
  delete(id: number): Promise<boolean>;
}
