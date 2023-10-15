import { getRepository } from 'typeorm';
import { errorMessages } from '@shared/errors/errorMessagesEnum';

import AppError from '@shared/errors/AppError';
import Company from '../typeorm/entities/companyEntity';
import { ICompanyResponse } from '../interfaces';

export class GetCompanyByNameService {
  public async execute(companyName: string): Promise<ICompanyResponse> {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne({
      where: { companyName },
    });

    if (!company) {
      console.log(`ERROR: ${errorMessages.COMPANY_NOT_EXISTS}`);
      throw new AppError(errorMessages.COMPANY_NOT_EXISTS, 404);
    }

    return company;
  }
}
