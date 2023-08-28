import { JsonWebToken } from "../../controllers/auth-controller/protocols";
import { User } from "../../models/user";
import { ICreateUserParams } from "../../repositories/user-repository/protocols";

export interface IAuthService {
  login(credentials: Credentials): Promise<JsonWebToken>;
  register(params: ICreateUserParams): Promise<User>;
  forgotPass(): Promise<string>;
  resetPass(): Promise<any>;
}

export type Credentials = {
  email: string;
  password: string;
};
