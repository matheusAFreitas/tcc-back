import { getRepository } from 'typeorm';

import { ICompanyResponse } from '../interfaces';

import AppError from '@shared/errors/AppError';
import { errorMessages } from '@shared/errors/errorMessagesEnum';

import Company from '../typeorm/entities/companyEntity';

export class GetCompanyService {
  public async execute(cnpj: string): Promise<ICompanyResponse> {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne({
      where: { cnpj },
    });

    if (!company) {
      console.log(`ERROR: ${errorMessages.CANNOT_FIND_COMPANY} ${cnpj}`);
      throw new AppError(`${errorMessages.CANNOT_FIND_COMPANY} ${cnpj}`, 404);
    }

    delete company.password;

    return company;
  }
}
