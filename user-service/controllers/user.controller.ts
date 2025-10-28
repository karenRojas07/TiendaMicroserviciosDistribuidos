import { type Request, type Response } from 'express';
import userService from '../repositories/user.repository';

const userRepository = new userService();
class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userRepository.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'El ID debe ser un número válido.' });
        return;
      }

      const user = await userRepository.getById(id);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: `No se encontró un usuario con el ID ${id}.` });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, estado } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: 'Los campos email y password son requeridos.' });
        return;
      }

      if (typeof email !== 'string' || email.trim() === '' ||
          typeof password !== 'string' || password.trim() === '') {
        res.status(400).json({ message: 'Los campos email y password no pueden estar vacíos.' });
        return;
      }

      const newUser = await userRepository.create({ email, password});
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario, el correo utilizado ya esta en uso' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'El ID debe ser un número válido.' });
        return;
      }

      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: 'Debe ingresar al menos un dato para actualizar.' });
        return;
      }

      const userExists = await userRepository.getById(id);
      if (!userExists) {
        res.status(404).json({ message: `No se puede actualizar porque no existe un usuario con el ID ${id}.` });
        return;
      }

      const updatedUser = await userRepository.update(id, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'El ID debe ser un número válido.' });
        return;
      }

      const userExists = await userRepository.getById(id);
      if (!userExists) {
        res.status(404).json({ message: `Debe ingresar un ID de un usuario existente para eliminar. No se encontró usuario con ID ${id}.` });
        return;
      }

      const success = await userRepository.delete(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(500).json({ message: 'Error inesperado al intentar eliminar el usuario.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
  }
}

export default new UserController();