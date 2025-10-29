import sequelize from './sequelize';
import { Order } from '../../domain/models/orderEntity';

export const initDb = async () => {
  try {
    // Sincroniza la base de datos con los modelos
    await sequelize.sync();
    console.log("Database synchronized with MySQL.");
  } catch (error) {
    console.error("Unable to sync the database:", error);
  }
};
