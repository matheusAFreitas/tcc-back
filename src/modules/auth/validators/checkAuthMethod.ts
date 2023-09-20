import { verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import { getRepository } from 'typeorm';
import User from '../../user/typeorm/entities/UserEntity';
import AppError from '../../../shared/errors/AppError';
import Company from '../../company/typeorm/entities/companyEntity';
import { errorMessages } from '../../../shared/errors/errorMessagesEnum';

export async function checkAuthMethod(
  bearer: string,
  authMethod: string
): Promise<void> {
  const [, token] = bearer.split(' ');

  const decoded = verify(token, authConfig.jwt.secret);

  const id = decoded.sub;

  if (authMethod === 'user') {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppError(errorMessages.SOMETHING_WRONG, 400);
    }
  }

  if (authMethod === 'company') {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne({ where: { id } });

    if (!company) {
      throw new AppError(errorMessages.ACCESS_DENIED, 403);
    }
  }
}
