// src/sequelize.ts
import { Sequelize } from 'sequelize';
import cfgFile from './db/config.json';

const cfg = cfgFile.db;

const sequelize = new Sequelize(cfg.database, cfg.user, cfg.password, {
  host: cfg.host,        // "localhost"
  port: cfg.port,        // 3007
  dialect: 'mysql',
  logging: console.log,  // o false si no quieres logs
  define: {
    timestamps: false,   // igual que en tu modelo
  },
});

export default sequelize;
