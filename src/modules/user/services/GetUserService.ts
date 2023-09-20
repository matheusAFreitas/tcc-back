import { getRepository } from 'typeorm';

import User from '../typeorm/entities/UserEntity';
import AppError from '../../../shared/errors/AppError';

import { IUserResponse } from '../interfaces';
import { checkIsAdminValidator } from '../../validators';

export class GetUserService {
  public async execute(email: string, token: string): Promise<IUserResponse> {
    const userRepository = getRepository(User);

    await checkIsAdminValidator(token);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError(`cannot find user with this email: ${email}`, 404);
    }

    delete user.password;

    return user;
  }
}
