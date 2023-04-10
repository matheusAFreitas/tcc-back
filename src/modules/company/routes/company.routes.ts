import { Router } from 'express';

import CreateCompanyService from '../services/CreateCompanyService';

const companyRoutes = Router();

companyRoutes.post('/', async (request, response) => {
  try {
    const { companyName, cnpj, password } = request.body;

    const createCompany = new CreateCompanyService();

    const company = await createCompany.execute({
      companyName,
      cnpj,
      password,
    });

    delete company.password;

    return response.json(company);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default companyRoutes;
