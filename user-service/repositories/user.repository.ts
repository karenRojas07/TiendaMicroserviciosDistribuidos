import type { User } from '../models/user';
import { pool } from '../db/mysql';


class UserRepository {
  async getAll(): Promise<User[]> {
    console.log('consultando base de datos...');
    const [rows] = await pool.query(
      'SELECT email, password FROM users ORDER BY email'
    );
    return rows as User[];
  }

  async getById(id: number): Promise<User | undefined> {
    const [rows] = await pool.query(
      'SELECT id, email, password FROM users WHERE id = ? LIMIT 1',
      [id]
    );
    const list = rows as User[];
    return list[0];
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    // [Inferencia] Normaliza el correo para consistencia
    const email = userData.email.trim().toLowerCase();
    const password = userData.password;

    // Pre-chequeo amigable
    const existing = await this.findByEmail(email);
    if (existing) {
      throw new Error('El email ya existe');
    }

    // Inserta y aún así captura duplicados (condición de carrera)
    try {
      const [res] = await pool.execute(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, password]
      );
      const insertId = (res as any).insertId as number;
      return { id: insertId, email, password };
    } catch (err: any) {
      if (err?.code === 'ER_DUP_ENTRY') {
        throw new Error('El email ya existe');
      }
      throw err;
    }
  }

  async update(id: number, userUpdate: Partial<Omit<User, 'id'>>): Promise<User | undefined> {
    const fields: string[] = [];
    const values: any[] = [];

    if (userUpdate.email !== undefined) {
      fields.push('email = ?');
      values.push(userUpdate.email);
    }
    if (userUpdate.password !== undefined) {
      fields.push('password = ?');
      values.push(userUpdate.password);
    }

    if (fields.length === 0) {
      return this.getById(id); // nada que actualizar
    }

    values.push(id);
    const [res] = await pool.execute(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    ) as any;

    if ((res as any).affectedRows === 0) return undefined;
    return this.getById(id);
  }

  async delete(id: number): Promise<boolean> {
    const [res] = await pool.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    ) as any;
    return (res as any).affectedRows > 0;
  }  

  async findByEmail(email: string): Promise<User | undefined> {
    const [rows] = await pool.query(
      'SELECT id, email, password FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    const list = rows as User[];
    return list[0];
  }
}


export default UserRepository;