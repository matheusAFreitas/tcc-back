export enum errorMessages {
  ACCESS_DENIED = 'access denied',
  NOT_AUTHORISED = 'not authorized',
  PASSWORD_LENGTH = 'the password is not long enough',
  INCORRECT_EMAILPASS = 'Incorrect email/password combination.',

  // user
  CANNOT_FIND_USER = 'cannot find user with this email:',
  USER_ALREADY_EXISTS = 'user with same email address already exists',

  // company
  COMPANY_NOT_EXISTS = 'Company does not exist',
  COMPANY_ALREADY_EXISTS = 'Company already exists',
  CANNOT_FIND_COMPANY = 'cannot find this company with this CNPJ:',
  INCORRECT_CNPJPASS = 'Incorrect cnpj/password combination',

  // bateu aqui fudeu
  SOMETHING_WRONG = 'something wrong',
}
