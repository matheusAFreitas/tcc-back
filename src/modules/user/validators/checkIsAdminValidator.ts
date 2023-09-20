import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import authConfig from '../../../config/auth';

import AppError from '../../../shared/errors/AppError';
import User from '../../user/typeorm/entities/UserEntity';

export async function checkIsAdminValidator(bearer: string): Promise<void> {
  const [, token] = bearer.split(' ');

  const decoded = verify(token, authConfig.jwt.secret);

  const id = decoded.sub;

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: { id },
  });

  if (!user.isAdmin) {
    throw new AppError('Acesso negado', 403);
  }
}
