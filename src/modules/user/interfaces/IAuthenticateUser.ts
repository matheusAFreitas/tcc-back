import User from '../typeorm/entities/UserEntity';

export interface IAuthenticateUserRequest {
  email?: string;
  cnpj?: string;
  password: string;
}

export interface IAuthenticateUserResponse {
  user: User;
  token: string;
}
