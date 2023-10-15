export enum errorMessages {
  ACCESS_DENIED = 'access denied',
  NOT_AUTHORISED = 'not authorized',
  PASSWORD_LENGTH = 'the password is not long enough',
  INCORRECT_EMAILPASS = 'Incorrect email/password combination.',

  // user
  CANNOT_FIND_USER = 'cannot find user with this email:',
  CANNOT_FIND_USER_ID = 'cannot find user with this id:',
  USER_ALREADY_EXISTS = 'user with this email address already exists',

  // company
  COMPANY_NOT_EXISTS = 'Company does not exist',
  COMPANY_ALREADY_EXISTS = 'Company already exists',
  CANNOT_FIND_COMPANY = 'cannot find this company with this CNPJ:',
  INCORRECT_CNPJPASS = 'Incorrect cnpj/password combination',

  //appointment
  COMPANY_NAME_WRONG = `company name doesn't match the user company name`,

  APPOINTMENT_ALREADY_BOOKED = 'appointment already booked',

  // bateu aqui fudeu
  SOMETHING_WRONG = 'something wrong',
}
