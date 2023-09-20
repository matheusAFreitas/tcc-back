import { getRepository } from 'typeorm';
import { IUserUpdateRequest } from '../interfaces';
import User from '../typeorm/entities/UserEntity';
import { errorMessages } from '../../../shared/errors/errorMessagesEnum';
import AppError from '../../../shared/errors/AppError';
import { hash } from 'bcryptjs';

export class UpdateUserService {
  async execute({ id, name, email, password }) {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id },
    });
    console.log(id);
    console.log(user);

    if (!user) {
      console.log(`ERROR: ${errorMessages.CANNOT_FIND_USER} ${id}`);
      throw new AppError(`${errorMessages.CANNOT_FIND_USER} ${id}`, 404);
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      const hashedPassword = await hash(password, 8);
      user.password = hashedPassword;
    }

    await userRepository.update(user, { ...user });

    delete user.password;

    return user;
  }
}
