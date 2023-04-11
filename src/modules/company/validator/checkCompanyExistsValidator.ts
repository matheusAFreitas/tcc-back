import { getRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';
import Company from '../typeorm/entities/companyEntity';

export async function checkCompanyExists(cnpj: string) {
  const companyRepository = getRepository(Company);

  const checkCompanyExists = await companyRepository.findOne({
    where: { cnpj },
  });

  if (checkCompanyExists) {
    throw new AppError('Company already exists', 400);
  }
}
