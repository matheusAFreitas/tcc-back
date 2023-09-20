import { getRepository } from 'typeorm';

import { ICompanyResponse } from '../interfaces';

import AppError from '../../../shared/errors/AppError';
import Company from '../typeorm/entities/companyEntity';

export class GetCompanyService {
  public async execute(cnpj: string): Promise<ICompanyResponse> {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne({
      where: { cnpj },
    });

    if (!company) {
      throw new AppError(
        `cannot find this company with this CNPJ: ${cnpj}`,
        404
      );
    }

    delete company.password;

    return company;
  }
}
