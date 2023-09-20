import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../../../errors/AppError';
import authConfig from '../../../../config/auth';
import { errorMessages } from '../../../errors/errorMessagesEnum';

interface ITokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(errorMessages.NOT_AUTHORISED, 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayLoad;

    req.user = {
      id: sub,
    };

    req.company = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError(errorMessages.NOT_AUTHORISED, 401);
  }
}
