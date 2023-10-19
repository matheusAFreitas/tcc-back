import { Router } from 'express';

import {
  GetUserService,
  CreateUserService,
  ChangeUserAdminService,
  DeleteUserService,
  UpdateUserService,
  GetUserByIdService,
} from '../services';

import { ensureAuthenticated } from '@shared/infra/http/middlewares';
import { IUserUpdateRequest } from '../interfaces';

const userRoutes = Router();

userRoutes.post('/', async (req, res) => {
  try {
    const { email, name, role, password, companyName } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      role,
      password,
      companyName,
    });

    console.log('POST', user);
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

userRoutes.get('/find/:email', ensureAuthenticated, async (req, res) => {
  const email = req.params.email;
  const token = req.headers.authorization;
  const getUser = new GetUserService();
  const user = await getUser.execute(email, token);

  console.log('GET', user);
  return res.json(user);
});

userRoutes.get('/get', ensureAuthenticated, async (req, res) => {
  const userId = req.user.id;

  const getUser = new GetUserByIdService();

  const user = await getUser.execute(userId);

  console.log('GET', user);
  return res.json(user);
});

userRoutes.patch('/update/:id', ensureAuthenticated, async (req, res) => {
  const id = req.params.id;
  const { email, name, password }: IUserUpdateRequest = req.body;

  const updateUser = new UpdateUserService();

  const user = await updateUser.execute({ id, name, email, password });

  console.log('PATCH', user);
  return res.json(user);
});

userRoutes.patch('/admin/:email', ensureAuthenticated, async (req, res) => {
  const email = req.params.email;
  const token = req.headers.authorization;

  const changeUserAdmin = new ChangeUserAdminService();

  const admin = await changeUserAdmin.execute(email, token);

  console.log('PATCH', admin);
  return res.json(admin);
});

userRoutes.delete('/:email', ensureAuthenticated, async (req, res) => {
  const email = req.params.email;
  const token = req.headers.authorization;

  const deleteUser = new DeleteUserService();

  const user = await deleteUser.execute(email, token);

  console.log('DELETE', user, 'DELETED: ', true);
  return res.json(user);
});

export default userRoutes;
