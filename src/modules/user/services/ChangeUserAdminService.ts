import { getRepository } from 'typeorm';

import User from '../typeorm/entities/UserEntity';
import AppError from '../../../shared/errors/AppError';

import { checkAuthMethod } from '../../auth/validators/checkAuthMethod';
import { errorMessages } from '../../../shared/errors/errorMessagesEnum';

export class ChangeUserAdminService {
  async execute(email: string, token: string) {
    const userRepository = getRepository(User);

    await checkAuthMethod(token, 'company');

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      console.log(`ERROR: ${errorMessages.CANNOT_FIND_USER} ${email}`);
      throw new AppError(`${errorMessages.CANNOT_FIND_USER} ${email}`);
    }

    if (user.isAdmin === true) {
      user.isAdmin = false;
    } else {
      user.isAdmin = true;
    }

    await userRepository.save(user);

    return user;
  }
}
