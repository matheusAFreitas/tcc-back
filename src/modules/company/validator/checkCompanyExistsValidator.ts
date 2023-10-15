import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import { errorMessages } from '@shared/errors/errorMessagesEnum';

import Company from '../typeorm/entities/companyEntity';

export async function checkCompanyExists(cnpj: string) {
  const companyRepository = getRepository(Company);

  const checkCompanyExists = await companyRepository.findOne({
    where: { cnpj },
  });

  if (checkCompanyExists) {
    console.log(`ERROR: ${errorMessages.COMPANY_ALREADY_EXISTS}`);
    throw new AppError(errorMessages.COMPANY_ALREADY_EXISTS, 400);
  }
}
