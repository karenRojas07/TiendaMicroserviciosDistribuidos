import { Sequelize } from 'sequelize';
import cfgFile from './config.json';
const cfg = cfgFile.db;  

// Configuración de Sequelize para MySQL
const sequelize = new Sequelize(cfg.database, cfg.user, cfg.password, {
  host: cfg.host,
  dialect: 'mysql',
  port: cfg.port,
  logging: false, 
});

export default sequelize;
