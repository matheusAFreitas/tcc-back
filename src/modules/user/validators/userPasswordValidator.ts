import AppError from '../../../shared/errors/AppError';

import { errorMessages } from '../../../shared/errors/errorMessagesEnum';

export function userPasswordValidator(password: string) {
  const checkPassword = password;

  if (checkPassword.length < 7) {
    console.log(`ERROR: ${errorMessages.PASSWORD_LENGTH}`);
    throw new AppError(errorMessages.PASSWORD_LENGTH, 400);
  }
}
