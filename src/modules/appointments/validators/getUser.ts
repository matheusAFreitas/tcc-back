import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { GetUserByIdService } from '@modules/user/services';
import { IUserResponse } from '@modules/user/interfaces';

export async function getUser(bearer: string): Promise<IUserResponse> {
  const [, token] = bearer.split(' ');

  const decoded = verify(token, authConfig.jwt.secret);

  const id = decoded.sub as unknown as string;

  const getUserById = new GetUserByIdService();

  const user = await getUserById.execute(id);

  return user;
}
