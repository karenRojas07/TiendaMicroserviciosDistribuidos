import sequelize, { testConnection } from './sequelize';
import { Order } from '../../domain/models/orderEntity';

export const initDb = async (): Promise<void> => {
  try {
    // Primero probar la conexión
    const isConnected = await testConnection();
    
    if (!isConnected) {
      throw new Error('Failed to connect to database');
    }

    // Sincronizar la base de datos con los modelos
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    
    console.log('Database synchronized with MySQL.');
  } catch (error) {
    console.error('Unable to sync the database:', error);
    // En producción, podrías querer salir del proceso
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

// Función para cerrar la conexión (útil para tests y graceful shutdown)
export const closeDb = async (): Promise<void> => {
  try {
    await sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
};