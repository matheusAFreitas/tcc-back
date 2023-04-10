import { v4 } from 'uuid';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '../typeorm/entities/UserEntity';
import AppError from '../../../shared/errors/AppError';
import { IUserRequest } from '../interfaces/IUserRequest';
import userPasswordValidator from '../../validators/userPasswordValidator';

class CreateUserService {
  async execute({ name, email, password }: IUserRequest): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('Email addres already used', 400);
    }

    userPasswordValidator(password);

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      id: v4(),
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
