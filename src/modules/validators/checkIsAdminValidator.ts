import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import authConfig from '../../config/auth';

import User from '../user/typeorm/entities/UserEntity';
import AppError from '../../shared/errors/AppError';

export default async function checkIsAdmin(bearer: string): Promise<void> {
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
