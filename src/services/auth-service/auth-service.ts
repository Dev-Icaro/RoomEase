import { ApiUnauthorizedError } from "../../errors/api-errors";
import { User } from "../../models/user";
import { ICreateUserParams } from "../../repositories/user-repository/protocols";
import { IAuthService, Credentials } from "./protocols";
import { ErrorFormatter } from "../../helpers/error-helpers";
import { createErrorMessage } from "../../helpers/error-helpers";
import { IUserService } from "../user-service/protocols";

export class AuthService implements IAuthService {
  constructor(private readonly userService: IUserService) {}

  async login(credentials: Credentials): Promise<string> {
    const { email, password } = credentials;

    if (!email) {
      const msg = ErrorFormatter.missingArg("email");
      throw new ApiUnauthorizedError(createErrorMessage(msg));
    }

    if (!password) {
      const msg = ErrorFormatter.missingArg("password");
      throw new ApiUnauthorizedError(createErrorMessage(msg));
    }

    const user = await this.userService.getByEmail(email);
    if (!user) {
      const msg = ErrorFormatter.notFound("email");
      throw new ApiUnauthorizedError(createErrorMessage(msg));
    }

    // Descrypt pass and compare it to the password sended by param
  }

  async register(params: ICreateUserParams): Promise<User> {
    return await this.userService.create(params);
  }

  forgotPass(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  resetPass(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
