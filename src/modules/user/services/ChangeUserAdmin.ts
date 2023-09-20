import { getRepository } from 'typeorm';
import User from '../typeorm/entities/UserEntity';
import { checkIsAdminValidator } from '../validators';
import AppError from '../../../shared/errors/AppError';
import { checkAuthMethod } from '../../auth/validators/checkAuthMethod';

export class ChangeUserAdmin {
  async execute(email: string, token: string) {
    const userRepository = getRepository(User);

    await checkAuthMethod(token, 'company');

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError(`user with email: ${email} not found`);
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
