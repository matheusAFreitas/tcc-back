import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../typeorm/entities/UserEntity';
import AppError from '../../../shared/errors/AppError';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../../../shared/infra/http/middlewares/ensureAuthenticated';
import GetUserService from '../services/GetUserService';
import checkIsAdmin from '../../validators/checkIsAdminValidator';

const userRoutes = Router();

userRoutes.post('/', async (request, response) => {
  try {
    const { email, name, password, companyName } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      companyName,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRoutes.get('/:email', ensureAuthenticated, async (request, response) => {
  const email = request.params.email;
  const token = request.headers.authorization;

  await checkIsAdmin(token);

  const getUser = new GetUserService();
  const user = await getUser.execute(email);

  // adicionado para provavel uso futuro
  if (!checkIsAdmin) {
    delete user.isAdmin;
  }

  return response.json(user);
});

export default userRoutes;
