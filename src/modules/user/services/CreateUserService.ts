import { v4 } from 'uuid';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '../typeorm/entities/UserEntity';

import {
  checkUserExist,
  userPasswordValidator,
  checkCompanyNameExistsValidator,
} from '../validators';
import { IUserRequest } from '../interfaces';

export class CreateUserService {
  async execute({
    name,
    email,
    role,
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
      role,
      email,
      companyName,
      password: hashedPassword,
    });

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}
