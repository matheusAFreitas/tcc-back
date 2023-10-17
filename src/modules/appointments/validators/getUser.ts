import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { GetUserByIdService } from '@modules/user/services';
import { IUserResponse } from '@modules/user/interfaces';

export async function getUser(id: string): Promise<IUserResponse> {
  const getUserById = new GetUserByIdService();

  const user = await getUserById.execute(id);

  return user;
}
