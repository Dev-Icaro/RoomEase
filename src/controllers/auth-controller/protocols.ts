import { User } from "../../models/user";
import { ICreateUserParams } from "../../repositories/user-repository/protocols";
import { Credentials } from "../../services/auth-service/protocols";
import { ErrorMessage } from "../../types/error-message";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IAuthController {
  login(
    httpRequest: HttpRequest<Credentials>
  ): Promise<HttpResponse<JsonWebToken | ErrorMessage>>;

  register(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<User | ErrorMessage>>;

  logout(): any;
}

export type JsonWebToken = {
  token: string;
};
