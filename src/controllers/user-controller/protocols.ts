import { User } from "../../models/user";
import {
  ICreateUserParams,
  IUpdateUserParams,
} from "../../repositories/user-repository/protocols";
import { HttpResponse, HttpRequest } from "../protocols";

export interface IUserController {
  getAll(): Promise<HttpResponse<User[] | string>>;

  getById(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<User | string>>;

  create(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<User | string>>;

  update(
    httpRequest: HttpRequest<IUpdateUserParams>
  ): Promise<HttpResponse<User | string>>;
}
