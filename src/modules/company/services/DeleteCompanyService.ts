import { getRepository } from 'typeorm';
import Company from '../typeorm/entities/companyEntity';
import { GetCompanyService } from './GetCompanyService';

export class DeleteCompanyService {
  public async execute(cnpj: string) {
    const companyRepository = getRepository(Company);
    const getCompany = new GetCompanyService();

    const company = await getCompany.execute(cnpj);

    await companyRepository.delete(company);

    return company;
  }
}
