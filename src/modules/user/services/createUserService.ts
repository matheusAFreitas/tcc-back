import { hash } from 'bcryptjs';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { IUserRequest } from '../interfaces/IUserRequest';
import User from '../typeorm/entities/userEntity';
import { v4 } from 'uuid';
import userPasswordValidator from '../../validators/userPasswordValidator';

const userRoutes = Router();

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
