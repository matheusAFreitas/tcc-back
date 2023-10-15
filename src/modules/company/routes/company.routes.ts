import { Router } from 'express';

import { GetCompanyService, CreateCompanyService } from '../services';
import { ensureAuthenticated } from '../../../shared/infra/http/middlewares';

const companyRoutes = Router();

companyRoutes.post('/', async (req, res) => {
  try {
    const { cnpj, password, companyName, rentSeats } = req.body;

    const createCompany = new CreateCompanyService();

    const company = await createCompany.execute({
      cnpj,
      password,
      companyName,
      rentSeats,
    });

    console.log('POST:', company);
    return res.json(company);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

companyRoutes.get('/:cnpj', ensureAuthenticated, async (req, res) => {
  const cnpj = req.params.cnpj;

  const getCompany = new GetCompanyService();
  const company = await getCompany.execute(cnpj);

  console.log('GET:', company);
  return res.json(company);
});

export default companyRoutes;
