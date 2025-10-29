import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize';

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public stock!: number;
  public estado!: 'activo' | 'inactivo';
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('activo', 'inactivo'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products', 
     timestamps: false,   
    }
);

export default Product;