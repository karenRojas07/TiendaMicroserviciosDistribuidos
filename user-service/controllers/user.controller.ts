import { type Request, type Response } from 'express';
import UserRepository from '../repositories/user.repository';

const userRepository = new UserRepository();

class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userRepository.getAll();
      res.status(200).json(users);
    } catch {
      res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        res.status(400).json({ message: 'El ID debe ser un número válido.' });
        return;
      }
      const user = await userRepository.getById(id);
      if (user) res.status(200).json(user);
      else res.status(404).json({ message: `No se encontró un usuario con el ID ${id}.` });
    } catch {
      res.status(500).json({ message: 'Error al obtener el usuario' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password || typeof email !== 'string' || typeof password !== 'string' ||
          email.trim() === '' || password.trim() === '') {
        res.status(400).json({ message: 'Los campos email y password son requeridos y no pueden estar vacíos.' });
        return;
      }

      const newUser = await userRepository.create({ email, password });
      res.status(201).json(newUser);
    } catch (error: any) {
      if (typeof error?.message === 'string' && /ya existe/i.test(error.message)) {
        res.status(409).json({ message: 'El correo utilizado ya está en uso' });
      } else {
        res.status(500).json({ message: 'Error al crear el usuario' });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        res.status(400).json({ message: 'El ID debe ser un número válido.' });
        return;
      }
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: 'Debe ingresar al menos un dato para actualizar.' });
        return;
      }
      const updatedUser = await userRepository.update(id, req.body);
      if (!updatedUser) {
        res.status(404).json({ message: `No se puede actualizar porque no existe un usuario con el ID ${id}.` });
        return;
      }
      res.status(200).json(updatedUser);
    } catch {
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        res.status(400).json({ message: 'El ID debe ser un número válido.' });
        return;
      }
      const success = await userRepository.delete(id);
      if (success) res.status(204).send();
      else res.status(404).json({ message: `No se encontró usuario con ID ${id}.` });
    } catch {
      res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
  }
}

export default new UserController();