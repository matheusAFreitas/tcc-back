import { getRepository } from 'typeorm';

import User from '../typeorm/entities/UserEntity';
import AppError from '../../../shared/errors/AppError';

import { errorMessages } from '../../../shared/errors/errorMessagesEnum';

export async function checkUserExist(email: string) {
  const userRepository = getRepository(User);
  const checkUserExists = await userRepository.findOne({ where: { email } });

  if (checkUserExists) {
    throw new AppError(errorMessages.USER_ALREADY_EXISTS, 400);
  }
}
