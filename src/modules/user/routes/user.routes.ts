import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../typeorm/entities/UserEntity';
import AppError from '../../../shared/errors/AppError';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../../../shared/infra/http/middlewares/ensureAuthenticated';

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

userRoutes.use(ensureAuthenticated);

userRoutes.get('/:email', async (request, response) => {
  const email = request.params.email;

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: { email },
  });

  if (!user) {
    throw new AppError(`cannot find user with this email: ${email}`, 404);
  }

  delete user.password;

  return response.json(user);
});

export default userRoutes;
