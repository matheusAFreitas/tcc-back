import AppError from '../../shared/errors/AppError';

function userPasswordValidator(password: string): boolean {
  const checkPassword = password;

  if (checkPassword.length < 8) {
    return false;
  }
}

export default userPasswordValidator;
