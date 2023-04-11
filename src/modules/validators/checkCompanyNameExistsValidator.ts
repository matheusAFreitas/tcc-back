import { getRepository } from 'typeorm';

import AppError from '../../shared/errors/AppError';
import Company from '../company/typeorm/entities/companyEntity';

export async function checkCompanyNameExistsValidator(companyName: string) {
  const companyRepository = getRepository(Company);

  const checkCompanyExists = await companyRepository.findOne({
    where: { companyName },
  });

  if (!checkCompanyExists) {
    throw new AppError('Company does not exist', 400);
  }
}
