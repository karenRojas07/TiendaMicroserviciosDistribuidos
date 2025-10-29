import { Sequelize } from 'sequelize';
import cfgFile from './config.json'; // Si tienes tu configuración en un archivo JSON, asegúrate de importar correctamente.

const cfg = cfgFile.db; // Extrae la configuración de MySQL del archivo JSON

// Configura Sequelize para MySQL con las credenciales proporcionadas
const sequelize = new Sequelize({
  dialect: 'mysql', // Cambiado de 'sqlite' a 'mysql'
  host: cfg.host,
  port: cfg.port, 
  username: cfg.user, 
  password: cfg.password,
  database: cfg.database, 
  pool: {
    max: cfg.connectionLimit || 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
