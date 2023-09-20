import { Router } from 'express';

import { GetUserService, CreateUserService } from '../services';
import { ensureAuthenticated } from '../../../shared/infra/http/middlewares';

const userRoutes = Router();

userRoutes.post('/', async (req, res) => {
  try {
    const { email, name, password, companyName } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      companyName,
    });

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

userRoutes.get('/:email', ensureAuthenticated, async (req, res) => {
  const email = req.params.email;
  const token = req.headers.authorization;

  const getUser = new GetUserService();
  const user = await getUser.execute(email, token);

  return res.json(user);
});

export default userRoutes;
