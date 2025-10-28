import type { Product } from '../models/product.js';
import type { ProductRepositoryPort } from '../repositories/product.repository.port.js';

class ProductService {
  private repository: ProductRepositoryPort;

  constructor(repository: ProductRepositoryPort) {
    this.repository = repository;
  }

  async getAll(): Promise<Product[]> {
    return this.repository.getAll()
  }

  async getById(id: number): Promise<Product | undefined> {
    return this.repository.getById(id);
  }

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    return this.repository.create(product);
  }

  async update(id: number, product: Partial<Omit<Product, 'id'>>): Promise<Product | undefined> {
    return this.repository.update(id, product);
  }

  async delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}

export default ProductService;
