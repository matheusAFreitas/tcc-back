import { getRepository } from 'typeorm';
import User from '../typeorm/entities/UserEntity';
import { IUserResponse } from '../interfaces/IUserResponse';
import AppError from '../../../shared/errors/AppError';

class GetUserService {
  public async execute(email: string): Promise<IUserResponse> {
    const userRepository = getRepository(User);

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

export default GetUserService;
