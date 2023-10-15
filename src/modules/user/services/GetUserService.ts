import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import { errorMessages } from '@shared/errors/errorMessagesEnum';

import User from '../typeorm/entities/UserEntity';

import { IUserResponse } from '../interfaces';
import { checkIsAdminValidator } from '../validators';

export class GetUserService {
  public async execute(email: string, token: string): Promise<IUserResponse> {
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

    return user;
  }
}
