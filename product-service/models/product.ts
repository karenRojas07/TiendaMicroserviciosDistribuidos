export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  estado: 'activo' | 'inactivo';
}