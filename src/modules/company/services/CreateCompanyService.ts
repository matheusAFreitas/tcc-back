import { v4 } from 'uuid';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { ICompanyRequest } from '../interfaces';

import Company from '../typeorm/entities/companyEntity';
import { companyPasswordValidator, checkCompanyExists } from '../validator';

class CreateCompanyService {
  async execute({
    cnpj,
    password,
    companyName,
    primaryColor,
    secondaryColor,
    availableSeats,
  }: ICompanyRequest): Promise<Company> {
    const companyRepository = getRepository(Company);

    await checkCompanyExists(cnpj);

    companyPasswordValidator(password);

    if (!primaryColor) {
      primaryColor = '#ffffff';
    }

    if (!secondaryColor) {
      secondaryColor = '#ffffff';
    }

    const hashedPassword = await hash(password, 15);

    const company = companyRepository.create({
      id: v4(),
      cnpj,
      companyName,
      primaryColor,
      secondaryColor,
      availableSeats,
      password: hashedPassword,
    });

    await companyRepository.save(company);

    return company;
  }
}

export default CreateCompanyService;
