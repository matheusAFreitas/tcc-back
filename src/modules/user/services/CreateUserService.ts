import { v4 } from 'uuid';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import { IUserRequest } from '../interfaces';

import {
  checkUserExist,
  userPasswordValidator,
  checkCompanyNameExistsValidator,
} from '../../validators';

import User from '../typeorm/entities/UserEntity';

export class CreateUserService {
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

    delete user.password;

    return user;
  }
}
