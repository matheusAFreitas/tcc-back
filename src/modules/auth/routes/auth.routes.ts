import { Router } from 'express';
import { AuthenticateService } from '../services/AutheticateService';

const authRoutes = Router();

authRoutes.post('/user', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

authRoutes.post('/company', async (req, res) => {
  const { cnpj, password } = req.body;
  const authenticateCompnay = new AuthenticateService();

  const { company, token } = await authenticateCompnay.execute({
    cnpj,
    password,
  });
  delete company.password;
  return res.json({ company, token });
});

export default authRoutes;
