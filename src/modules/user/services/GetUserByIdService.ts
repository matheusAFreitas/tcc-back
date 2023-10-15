import { getRepository } from 'typeorm';

import User from '../typeorm/entities/UserEntity';
import AppError from '../../../shared/errors/AppError';

import { IUserResponse } from '../interfaces';
import { checkIsAdminValidator } from '../validators';
import { errorMessages } from '../../../shared/errors/errorMessagesEnum';

export class GetUserByIdService {
  public async execute(id: string): Promise<IUserResponse> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      console.log(`ERROR: ${errorMessages.CANNOT_FIND_USER_ID} ${id}`);
      throw new AppError(`${errorMessages.CANNOT_FIND_USER_ID} ${id}`, 404);
    }

    delete user.password;

    return user;
  }
}
