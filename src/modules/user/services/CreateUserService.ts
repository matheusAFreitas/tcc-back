import { v4 } from 'uuid';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import {
  checkUserExist,
  checkCompanyNameExistsValidator,
} from '../../validators';

import { IUserRequest } from '../interfaces';

import User from '../typeorm/entities/UserEntity';
import Company from '../../company/typeorm/entities/companyEntity';
import userPasswordValidator from '../../validators/userPasswordValidator';

class CreateUserService {
  async execute({
    name,
    email,
    password,
    companyName,
  }: IUserRequest): Promise<User> {
    const userRepository = getRepository(User);

    await checkUserExist(email);
    await checkCompanyNameExistsValidator(companyName);

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
