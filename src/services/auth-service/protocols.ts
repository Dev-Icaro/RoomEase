import { User } from "../../models/user";
import { ICreateUserParams } from "../../repositories/user-repository/protocols";

export interface IAuthService {
  login(credentials: Credentials): Promise<string>;
  register(params: ICreateUserParams): Promise<User>;
  forgotPass(): Promise<string>;
  resetPass(): Promise<any>;
}

export type Credentials = {
  email: string;
  password: string;
};
