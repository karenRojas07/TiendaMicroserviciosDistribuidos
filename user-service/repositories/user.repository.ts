import User, { IUserAttributes } from '../models/userEntity';
import { UniqueConstraintError } from 'sequelize';

class UserRepository {
  async getAll(): Promise<Pick<IUserAttributes, 'id' | 'email'>[]> {
    // No exponemos password en listados
    return await User.findAll({
      attributes: ['id', 'email'],
      raw: true,
    });
  }

  async getById(id: number): Promise<Pick<IUserAttributes, 'id' | 'email'> | null> {
    const user = await User.findByPk(id, {
      attributes: ['id', 'email'],
      raw: true,
    });
    return user ?? null;
  }

  async create(userData: Omit<IUserAttributes, 'id'>): Promise<Pick<IUserAttributes, 'id' | 'email'>> {
    const email = userData.email.trim().toLowerCase();
    const password = userData.password;

    const existing = await this.findByEmail(email);
    if (existing) {
      throw new Error('El email ya existe');
    }

    try {
      const user = await User.create({ email, password });
      // Devolvemos solo id y email
      return { id: user.id, email: user.email };
    } catch (err: any) {
      if (err instanceof UniqueConstraintError) {
        throw new Error('El email ya existe');
      }
      throw err;
    }
  }

  async update(
    id: number,
    userUpdate: Partial<Omit<IUserAttributes, 'id'>>
  ): Promise<Pick<IUserAttributes, 'id' | 'email'> | null> {
    const user = await User.findByPk(id);
    if (!user) return null;

    if (typeof userUpdate.email === 'string') {
      user.email = userUpdate.email.trim().toLowerCase();
    }
    if (typeof userUpdate.password === 'string') {
      user.password = userUpdate.password;
    }
    await user.save();

    return { id: user.id, email: user.email };
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await User.destroy({ where: { id } });
    return deleted > 0;
  }

  async findByEmail(email: string): Promise<IUserAttributes | null> {
    const user = await User.findOne({
      where: { email },
      raw: true,
    });
    return user as IUserAttributes | null;
  }
}

export default UserRepository;
