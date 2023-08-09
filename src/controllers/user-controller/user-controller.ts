import { ErrorFormatter } from "../../helpers/error-formatter";
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "../../helpers/http-response-helpers";
import { User } from "../../models/user";
import {
  ICreateUserParams,
  IUpdateUserParams,
  IUserRepository,
} from "../../repositories/user-repository/protocols";
import { validateId } from "../../validators/generic-validators";
import { HttpResponse, HttpRequest } from "../protocols";
import { IUserController } from "./protocols";

export class UserController implements IUserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAll(): Promise<HttpResponse<User[] | string>> {
    try {
      const user = await this.userRepository.getAll();
      return ok(user);
    } catch (error) {
      return serverError();
    }
  }

  async getById(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<User | string>> {
    try {
      const { id } = httpRequest.params;

      const error = validateId(id);
      if (error.length > 0) {
        return badRequest(error);
      }

      const user = await this.userRepository.getById(id);

      if (!user) {
        const msg = ErrorFormatter.notFound("user");
        return notFound(msg);
      }

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }

  async create(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const { body } = httpRequest;

      if (!body) {
        const msg = ErrorFormatter.missingArg("body");
        return badRequest(msg);
      }

      const user = await this.userRepository.create(body);

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }

  async update(
    httpRequest: HttpRequest<IUpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const { id } = httpRequest.params;
      const { body } = httpRequest;

      if (!body) {
        const msg = ErrorFormatter.missingArg("body");
        return badRequest(msg);
      }

      const user = await this.userRepository.update(body, id);

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
