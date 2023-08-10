import { User } from "../../models/user";
import {
  ICreateUserParams,
  IUpdateUserParams,
} from "../../repositories/user-repository/protocols";
import { ErrorMessage } from "../../types/error-message";
import { HttpResponse, HttpRequest } from "../protocols";
export interface IUserController {
  getAll(): Promise<HttpResponse<User[] | ErrorMessage>>;

  getById(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<User | ErrorMessage>>;

  create(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<User | ErrorMessage>>;

  update(
    httpRequest: HttpRequest<IUpdateUserParams>
  ): Promise<HttpResponse<User | ErrorMessage>>;
}
