import { v4 } from 'uuid';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { ICompanyRequest } from '../interfaces/ICompanyRequest';

import AppError from '../../../shared/errors/AppError';
import Company from '../typeorm/entities/companyEntity';
import companyPasswordValidator from '../validator/companyPasswordValidator';

class CreateCompanyService {
  async execute({
    companyName,
    cnpj,
    password,
  }: ICompanyRequest): Promise<Company> {
    const companyRepository = getRepository(Company);

    const checkCompanyExists = await companyRepository.findOne({
      where: { cnpj },
    });

    if (checkCompanyExists) {
      throw new AppError('Company already exists', 400);
    }

    companyPasswordValidator(password);

    const hashedPassword = await hash(password, 15);

    const company = companyRepository.create({
      id: v4(),
      companyName,
      cnpj,
      password: hashedPassword,
    });

    await companyRepository.save(company);

    return company;
  }
}

export default CreateCompanyService;
