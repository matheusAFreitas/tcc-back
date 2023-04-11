import { v4 } from 'uuid';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '../typeorm/entities/UserEntity';
import AppError from '../../../shared/errors/AppError';
import { IUserRequest } from '../interfaces/IUserRequest';
import userPasswordValidator from '../../validators/userPasswordValidator';
import Company from '../../company/typeorm/entities/companyEntity';

class CreateUserService {
  async execute({
    name,
    email,
    password,
    companyName,
  }: IUserRequest): Promise<User> {
    const userRepository = getRepository(User);
    const companyRepository = getRepository(Company);

    const checkUserExists = await userRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('Email addres already used', 400);
    }

    const checkCompanyExists = await companyRepository.findOne({
      where: { companyName },
    });

    if (!checkCompanyExists) {
      throw new AppError('Company does not exist', 400);
    }

    userPasswordValidator(password);

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      id: v4(),
      name,
      email,
      companyName,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
