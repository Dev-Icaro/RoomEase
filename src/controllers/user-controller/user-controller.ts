import { ErrorFormatter, ErrorHandler } from "../../helpers/error-helpers";
import { badRequest, ok } from "../../helpers/http-response-helpers";
import { User } from "../../models/user";
import {
  ICreateUserParams,
  IUpdateUserParams,
} from "../../repositories/user-repository/protocols";
import { IUserService } from "../../services/user-service/protocols";
import { validateId } from "../../validators/generic-validators";
import { HttpResponse, HttpRequest } from "../protocols";
import { ErrorMessage } from "../../types/error-message";
import { IUserController } from "./protocols";

export class UserController implements IUserController {
  constructor(private readonly userService: IUserService) {}

  async getAll(): Promise<HttpResponse<User[] | ErrorMessage>> {
    try {
      const user = await this.userService.getAll();
      return ok(user);
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }

  async getById(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<User | ErrorMessage>> {
    try {
      const { id } = httpRequest.params;

      const errors = validateId(id);
      if (!errors.isEmpty()) {
        return badRequest(errors.toErrorMessage());
      }

      const user = await this.userService.getById(id);

      return ok(user);
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }

  async create(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<User | ErrorMessage>> {
    try {
      const { body } = httpRequest;

      if (!body) {
        const msg = ErrorFormatter.missingArg("body");
        return badRequest({ message: msg });
      }

      const user = await this.userService.create(body);

      return ok(user);
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }

  async update(
    httpRequest: HttpRequest<IUpdateUserParams>
  ): Promise<HttpResponse<User | ErrorMessage>> {
    try {
      const { id } = httpRequest.params;
      const { body } = httpRequest;

      const errors = validateId(id);
      if (!errors.isEmpty()) return badRequest(errors.toErrorMessage());

      if (!body) {
        const msg = ErrorFormatter.missingArg("body");
        return badRequest({ message: msg });
      }

      const user = await this.userService.update(body, id);

      return ok(user);
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }

  async delete(
    httpRequest: HttpRequest<null>
  ): Promise<HttpResponse<User | ErrorMessage>> {
    try {
      const { id } = httpRequest.params;

      const errors = validateId(id);
      if (!errors.isEmpty()) return badRequest(errors.toErrorMessage());

      const user = await this.userService.delete(id);

      return ok(user);
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }
}
