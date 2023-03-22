import User from '../typeorm/entities/userEntity';

export interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

export interface IAuthenticateUserResponse {
  user: User;
  token: string;
}
