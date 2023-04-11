import AppError from '../../../shared/errors/AppError';

function companyPasswordValidator(password: string) {
  const checkPassword = password;

  if (checkPassword.length < 14) {
    throw new AppError('the password is not long enough', 400);
  }
}

export default companyPasswordValidator;
