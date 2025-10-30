interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
}

export const dbConfig: DbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3007'),
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'tiendaApp',
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
};