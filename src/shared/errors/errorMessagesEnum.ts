export enum errorMessages {
  PASSWORD_LENGTH = 'the password is not long enough',
  INCORRECT_EMAILPASS = 'Incorrect email/password combination.',
  ACCESS_DENIED = 'access denied',
  NOT_AUTHORISED = 'not authorized',

  // user
  USER_ALREADY_EXISTS = 'user with same email address already exists',
  CANNOT_FIND_USER = 'cannot find user with this email:',

  // company
  COMPANY_NOT_EXISTS = 'Company does not exist',
  CANNOT_FIND_COMPANY = 'cannot find this company with this CNPJ:',

  // bateu aqui fudeu
  SOMETHING_WRONG = 'something wrong',
}
