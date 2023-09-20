import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { IAuthenticateRequest, IAuthenticateResponse } from '../interfaces';
import User from '../../user/typeorm/entities/UserEntity';
import Company from '../../company/typeorm/entities/companyEntity';
import AppError from '../../../shared/errors/AppError';
import authConfig from '../../../config/auth';

export class AuthenticateService {
  public async execute({
    email,
    cnpj,
    password,
  }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    const usersRepository = getRepository(User);
    const companyRepository = getRepository(Company);

    if (email) {
      const user = await usersRepository.findOne({ where: { email } });
      if (!user) {
        throw new AppError('Incorrect email/password combination.', 401);
      }
      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
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

    if (cnpj) {
      const company = await companyRepository.findOne({ where: { cnpj } });
      if (!company) {
        throw new AppError('Incorrect cnpj/password combination', 401);
      }
      const passwordMatch = await compare(password, company.password);
      if (!passwordMatch) {
        throw new AppError('Incorrect email/password combination.', 401);
      }
      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
        subject: company.id,
        expiresIn,
      });

      return {
        company,
        token,
      };
    }
  }
}
