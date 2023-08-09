import validator from "validator";
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
} from "../../repositories/user-repository/protocols";
import { IUserService } from "../../services/user-service/protocols";
import { validateId } from "../../validators/generic-validators";
import { HttpResponse, HttpRequest } from "../protocols";
import { IUserController } from "./protocols";

export class UserController implements IUserController {
  constructor(private readonly userService: IUserService) {}

  async getAll(): Promise<HttpResponse<User[] | string>> {
    try {
      const user = await this.userService.getAll();
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

      const user = await this.userService.getById(id);

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

      const user = await this.userService.create(body);

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

      const error = validateId(id);
      if (error.length > 0) {
        return badRequest(error);
      }

      if (!body) {
        const msg = ErrorFormatter.missingArg("body");
        return badRequest(msg);
      }

      const user = await this.userService.update(body, id);

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
