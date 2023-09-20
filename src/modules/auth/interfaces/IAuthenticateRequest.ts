import User from '../../user/typeorm/entities/UserEntity';
import Company from '../../company/typeorm/entities/companyEntity';

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
