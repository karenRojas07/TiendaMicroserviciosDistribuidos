// db/mysql.ts
import mysql from 'mysql2/promise';
import cfgFile from './config.json';
const cfg = cfgFile.db;

export const pool = mysql.createPool({
  host: cfg.host,
  port: cfg.port,
  user: cfg.user,
  password: cfg.password,
  database: cfg.database,
  waitForConnections: true,
  connectionLimit: cfg.connectionLimit ?? 10,
  queueLimit: 0
});

export async function pingDb() {
  const conn = await pool.getConnection();
  try { await conn.ping(); }
  finally { conn.release(); }
}
