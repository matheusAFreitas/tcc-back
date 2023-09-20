import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import authConfig from '../../../config/auth';

import AppError from '../../../shared/errors/AppError';
import User from '../../user/typeorm/entities/UserEntity';
import Company from '../../company/typeorm/entities/companyEntity';

export async function checkIsAdminValidator(bearer: string): Promise<void> {
  const [, token] = bearer.split(' ');

  const decoded = verify(token, authConfig.jwt.secret);

  const id = decoded.sub;

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: { id },
  });

  if (!user) {
    const companyRepository = getRepository(Company);
    const company = await companyRepository.findOne({ where: { id } });
    if (company) {
      return;
    } else {
      throw new AppError('erro inesperado', 400);
    }
  }

  if (!user.isAdmin) {
    throw new AppError('Acesso negado', 403);
  }
}