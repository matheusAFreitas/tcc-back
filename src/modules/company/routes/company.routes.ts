import { Router } from 'express';

import CreateCompanyService from '../services/CreateCompanyService';

const companyRoutes = Router();

companyRoutes.post('/', async (request, response) => {
  try {
    const {
      cnpj,
      password,
      companyName,
      availableSeats,
    } = request.body;

    const createCompany = new CreateCompanyService();

    const company = await createCompany.execute({
      cnpj,
      password,
      companyName,
      availableSeats,
    });

    delete company.password;

    return response.json(company);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default companyRoutes;
