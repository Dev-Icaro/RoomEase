import { IAuthController, JsonWebToken } from "./protocols";
import {
  Credentials,
  IAuthService,
} from "../../services/auth-service/protocols";
import { HttpRequest, HttpResponse } from "../protocols";
import { badRequest, ok } from "../../helpers/http-response-helpers";
import {
  ErrorFormatter,
  ErrorHandler,
  createErrorMessage,
} from "../../helpers/error-helpers";
import { ErrorMessage } from "../../types/error-message";
import { ICreateUserParams } from "../../repositories/user-repository/protocols";
import { User } from "../../models/user";

export class AuthController implements IAuthController {
  constructor(private readonly authService: IAuthService) {}

  async login(
    httpRequest: HttpRequest<Credentials>
  ): Promise<HttpResponse<JsonWebToken | ErrorMessage>> {
    try {
      const { body } = httpRequest;

      if (!body)
        return badRequest(
          createErrorMessage(ErrorFormatter.missingArg("body"))
        );

      const jwt = await this.authService.login(body);

      return ok(jwt);
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }

  async register(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<User | ErrorMessage>> {
    try {
      const { body } = httpRequest;

      if (!body)
        return badRequest(
          createErrorMessage(ErrorFormatter.missingArg("body"))
        );

      const user = await this.authService.register(body);

      return ok(user);
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }

  logout(): any {
    throw new Error("Method not implemented.");
  }
}
