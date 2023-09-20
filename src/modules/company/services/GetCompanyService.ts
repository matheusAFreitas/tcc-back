import { getRepository } from 'typeorm';

import { ICompanyResponse } from '../interfaces';

import AppError from '../../../shared/errors/AppError';
import Company from '../typeorm/entities/companyEntity';
import { errorMessages } from '../../../shared/errors/errorMessagesEnum';

export class GetCompanyService {
  public async execute(cnpj: string): Promise<ICompanyResponse> {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne({
      where: { cnpj },
    });

    if (!company) {
      throw new AppError(`${errorMessages.CANNOT_FIND_COMPANY} ${cnpj}`, 404);
    }

    delete company.password;

    return company;
  }
}
