
import { Sequelize } from 'sequelize';
import { dbConfig } from './config';

// Configurar Sequelize para MySQL con variables de entorno
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  pool: {
    max: dbConfig.connectionLimit,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log(`Database connection established successfully to ${dbConfig.host}:${dbConfig.port}`);
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
};

export default sequelize;
