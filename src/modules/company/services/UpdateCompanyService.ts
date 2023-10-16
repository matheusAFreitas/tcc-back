import { getRepository } from 'typeorm';
import Company from '../typeorm/entities/companyEntity';
import AppError from '../../../shared/errors/AppError';
import { errorMessages } from '../../../shared/errors/errorMessagesEnum';
import { hash } from 'bcryptjs';
import { companyPasswordValidator } from '../validator';

export class UpdateCompanyService {
  public async execute({ id, companyName, rentSeats, password }) {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne({
      where: { id },
    });

    if (!company) {
      console.log('ERROR:', errorMessages.CANNOT_FIND_COMPANY);
      throw new AppError(errorMessages.CANNOT_FIND_COMPANY, 404);
    }

    if (companyName) {
      company.companyName = companyName;
    }

    if (rentSeats) {
      company.rentSeats = rentSeats;
    }

    if (password) {
      await companyPasswordValidator(password);
      const hashedPassword = await hash(password, 15);
      company.password = hashedPassword;
    }

    await companyRepository.save(company);

    delete company.password;

    return company;
  }
}
