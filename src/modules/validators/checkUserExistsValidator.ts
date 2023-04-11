import { getRepository } from 'typeorm';

import AppError from '../../shared/errors/AppError';
import User from '../user/typeorm/entities/UserEntity';

export async function checkUserExist(email: string) {
  const userRepository = getRepository(User);
  const checkUserExists = await userRepository.findOne({ where: { email } });

  if (checkUserExists) {
    throw new AppError('Email addres already used', 400);
  }
}
