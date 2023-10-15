import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Company from '@modules/company/typeorm/entities/companyEntity';

import { errorMessages } from '@shared/errors/errorMessagesEnum';

export async function checkCompanyNameExistsValidator(companyName: string) {
  const companyRepository = getRepository(Company);

  const checkCompanyExists = await companyRepository.findOne({
    where: { companyName },
  });

  if (!checkCompanyExists) {
    console.log(`ERROR: ${errorMessages.COMPANY_NOT_EXISTS}`);
    throw new AppError(errorMessages.COMPANY_NOT_EXISTS, 404);
  }
}
