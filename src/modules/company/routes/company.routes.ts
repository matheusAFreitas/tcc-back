import { Router } from 'express';

import {
  GetCompanyService,
  CreateCompanyService,
  UpdateCompanyService,
  DeleteCompanyService,
} from '../services';
import { ensureAuthenticated } from '@shared/infra/http/middlewares';
import { ICompanyUpdateRequest } from '../interfaces';

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

companyRoutes.patch('/update/:id', ensureAuthenticated, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { companyName, rentSeats, password }: ICompanyUpdateRequest = req.body;

  const updateCompany = new UpdateCompanyService();

  const company = await updateCompany.execute({
    id,
    companyName,
    rentSeats,
    password,
  });

  console.log('PATCH:', company);
  return res.json(company);
});

companyRoutes.delete('/:cnpj', ensureAuthenticated, async (req, res) => {
  const cnpj = req.params.cnpj;

  const deleteCompany = new DeleteCompanyService();

  const company = await deleteCompany.execute(cnpj);

  console.log('DELETE:', company);
  return res.json(company);
});

export default companyRoutes;
