import { getRepository } from 'typeorm';
import { checkIsAdminValidator } from '../validators';
import User from '../typeorm/entities/UserEntity';

import { errorMessages } from '@shared/errors/errorMessagesEnum';
import AppError from '@shared/errors/AppError';

export class DeleteUserService {
  public async execute(email: string, token: string) {
    const userRepository = getRepository(User);

    await checkIsAdminValidator(token);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      console.log(`ERROR: ${errorMessages.CANNOT_FIND_USER} ${email}`);
      throw new AppError(`${errorMessages.CANNOT_FIND_USER} ${email}`, 404);
    }
    delete user.password;

    await userRepository.delete(user);

    return user;
  }
}
