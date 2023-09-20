import { getRepository } from 'typeorm';

import User from '../typeorm/entities/UserEntity';
import AppError from '../../../shared/errors/AppError';

export async function checkUserExist(email: string) {
  const userRepository = getRepository(User);
  const checkUserExists = await userRepository.findOne({ where: { email } });

  if (checkUserExists) {
    throw new AppError('Email addres already used', 400);
  }
}
