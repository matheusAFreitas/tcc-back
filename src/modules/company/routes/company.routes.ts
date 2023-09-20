import { Router } from 'express';

import { GetCompanyService, CreateCompanyService } from '../services';

const companyRoutes = Router();

companyRoutes.post('/', async (req, res) => {
  try {
    const { cnpj, password, companyName, availableSeats } = req.body;

    const createCompany = new CreateCompanyService();

    const company = await createCompany.execute({
      cnpj,
      password,
      companyName,
      availableSeats,
    });

    return res.json(company);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

companyRoutes.get('/:cnpj', async (req, res) => {
  const cnpj = req.params.cnpj;

  const getCompany = new GetCompanyService();
  const company = await getCompany.execute(cnpj);

  return res.json(company);
});

export default companyRoutes;
