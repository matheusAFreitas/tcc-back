import { request, response, Router } from 'express';
import CreateUserService from '../../../../modules/user/services/createUserService';

const userRoutes = Router();

userRoutes.post('/', async (request, response) => {
  try {
    const { email, name, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRoutes.get('/', (request, response) => {});

export default userRoutes;
