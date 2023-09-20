import { getRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';
import Company from '../typeorm/entities/companyEntity';
import { errorMessages } from '../../../shared/errors/errorMessagesEnum';

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
