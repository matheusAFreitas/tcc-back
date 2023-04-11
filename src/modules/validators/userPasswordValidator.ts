import AppError from '../../shared/errors/AppError';

function userPasswordValidator(password: string) {
  const checkPassword = password;

  if (checkPassword.length < 7) {
    throw new AppError('the password is not long enough', 400);
  }
}

export default userPasswordValidator;
