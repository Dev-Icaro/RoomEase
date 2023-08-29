import { ApiUnauthorizedError } from "../../errors/api-errors";
import { User } from "../../models/user";
import { ICreateUserParams } from "../../repositories/user-repository/protocols";
import { IAuthService, Credentials } from "./protocols";
import { ErrorFormatter } from "../../helpers/error-helpers";
import { createErrorMessage } from "../../helpers/error-helpers";
import { IUserService } from "../user-service/protocols";
import { compareHashes } from "../../utils/crypto-utils";
import jwt from "jsonwebtoken";
import { JsonWebToken } from "../../controllers/auth-controller/protocols";

export class AuthService implements IAuthService {
  constructor(private readonly userService: IUserService) {}

  async login(credentials: Credentials): Promise<JsonWebToken> {
    const { email, password } = credentials;

    if (!email)
      throw new ApiUnauthorizedError(
        createErrorMessage(ErrorFormatter.missingArg("email")),
      );

    if (!password)
      throw new ApiUnauthorizedError(
        createErrorMessage(ErrorFormatter.missingArg("password")),
      );

    // If the user was not found the service will throw an error.
    const user = await this.userService.getByEmail(email);
    const isValidPass = compareHashes(password, user.password);

    if (isValidPass) {
      const payload = {
        user: user,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: "1h",
      });

      return { token };
    } else
      throw new ApiUnauthorizedError(
        createErrorMessage("Invalid email or password"),
      );
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
