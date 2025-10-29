import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize';

// Definir la interfaz para los atributos de una orden
export interface OrderAttributes {
  id: number;
  productId: number;
  quantity: number;
  total: number;
  createdAt: Date;
}

// Interfaz de atributos opcionales para la creación
export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes {
  public id!: number;
  public productId!: number;
  public quantity!: number;
  public total!: number;
  public createdAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id', // Mapeo de la columna product_id en la base de datos
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at', // Mapeo de la columna created_at en la base de datos
    },
  },
  {
    sequelize,
    tableName: 'orders', // Nombre de la tabla en la base de datos
    timestamps: true,
    updatedAt: false, // Deshabilitar el campo updatedAt
  }
);
