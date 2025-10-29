import type { Request, Response } from 'express';
import ProductService from '../../aplication/product.service';
import ProductRepository from '../repositories/product.repository';
import type { Product } from '../../domain/productInterface';

type CreateProductBody = Omit<Product, 'id'>;
type UpdateProductBody = Partial<CreateProductBody>;

const productService = new ProductService(new ProductRepository());

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

const getById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: 'El ID debe ser un número válido.' });
      return;
    }

    const product = await productService.getById(id);
    if (!product) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

const create = async (req: Request<object, object, CreateProductBody>, res: Response): Promise<void> => {
  try {
    const { name, price, stock, estado } = req.body;
    if (!name || price === undefined || stock === undefined || !estado) {
      res.status(400).json({ message: 'Datos incompletos. Se requieren name, price, stock y estado.' });
      return;
    }
    const newProduct = await productService.create({ name, price, stock, estado });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

const update = async (req: Request<{ id: string }, object, UpdateProductBody>, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: 'El ID debe ser un número válido.' });
      return;
    }

    const productDataToUpdate = req.body;
    if (Object.keys(productDataToUpdate).length === 0) {
      res.status(400).json({ message: 'No se proporcionaron datos para actualizar.' });
      return;
    }

    const updatedProduct = await productService.update(id, productDataToUpdate);
    if (!updatedProduct) {
      res.status(404).json({ message: 'Producto no encontrado.' });
      return;
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

const remove = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: 'El ID debe ser un número válido.' });
      return;
    }
    const success = await productService.delete(id);
    if (!success) {
      res.status(404).json({ message: 'Producto no encontrado.' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};

export default { getAll, getById, create, update, remove };
