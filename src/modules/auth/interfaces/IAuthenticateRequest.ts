import Company from '../../company/typeorm/entities/companyEntity';
import User from '../../user/typeorm/entities/UserEntity';

export interface IAuthenticateRequest {
  email?: string;
  cnpj?: string;
  password: string;
}

export interface IAuthenticateResponse {
  user?: User;
  company?: Company;
  token: string;
}
