import Product from '../models/productEntity';
import type { ProductRepositoryPort } from './product.repository.port';

class ProductRepository implements ProductRepositoryPort {
  // Obtener todos los productos
  async getAll(): Promise<Product[]> {
    const products = await Product.findAll(); 
    return products.map(product => product.get());  
  }

  // Obtener un producto por su ID
  async getById(id: number): Promise<Product | undefined> {
    const product = await Product.findByPk(id);  // Buscar por el ID (Primary Key)
    return product ? product.get() : undefined;  // Si existe, devolver el producto; si no, undefined
  }

  // Crear un nuevo producto
  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    const product = await Product.create(productData);  
    return product.get();  
  }

  // Actualizar un producto
  async update(id: number, productUpdate: Partial<Omit<Product, 'id'>>): Promise<Product | undefined> {
    const product = await Product.findByPk(id);  // Buscar el producto por ID
    if (!product) return undefined;  // Si no se encuentra, devolver undefined

    await product.update(productUpdate);  // Actualizar los campos que se pasaron
    return product.get();  
  }

  // Eliminar un producto
  async delete(id: number): Promise<boolean> {
    const product = await Product.findByPk(id);  
    if (!product) return false;  
    
    await product.destroy();  
    return true;  
  }
}

export default ProductRepository;
