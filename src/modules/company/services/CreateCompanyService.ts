import { v4 } from 'uuid';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { ICompanyRequest } from '../interfaces';

import Company from '../typeorm/entities/companyEntity';

import { companyPasswordValidator, checkCompanyExists } from '../validator';

export class CreateCompanyService {
  async execute({
    cnpj,
    password,
    companyName,
    rentSeats,
  }: ICompanyRequest): Promise<Company> {
    const companyRepository = getRepository(Company);

    await checkCompanyExists(cnpj);

    companyPasswordValidator(password);

    const hashedPassword = await hash(password, 15);

    const company = companyRepository.create({
      id: v4(),
      cnpj,
      companyName,
      rentSeats,
      availableSeats: rentSeats,
      password: hashedPassword,
    });

    await companyRepository.save(company);

    delete company.password;

    return company;
  }
}
