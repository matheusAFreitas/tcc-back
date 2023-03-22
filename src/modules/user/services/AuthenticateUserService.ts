import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import {
  IAuthenticateUserRequest,
  IAuthenticateUserResponse,
} from '../interfaces';

import authConfig from '../../../config/auth';
import User from '../typeorm/entities/userEntity';
import AppError from '../../../shared/errors/AppError';

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });
    const passwordMatch = await compare(password, user.password);

    if (!user || !passwordMatch) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
