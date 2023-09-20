import { getRepository } from 'typeorm';

import User from '../typeorm/entities/UserEntity';
import AppError from '../../../shared/errors/AppError';

import { IUserResponse } from '../interfaces';
import { checkIsAdminValidator } from '../validators';
import { errorMessages } from '../../../shared/errors/errorMessagesEnum';

export class GetUserService {
  public async execute(email: string, token: string): Promise<IUserResponse> {
    const userRepository = getRepository(User);

    await checkIsAdminValidator(token);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError(`${errorMessages.CANNOT_FIND_USER} ${email}`, 404);
    }

    delete user.password;

    return user;
  }
}
