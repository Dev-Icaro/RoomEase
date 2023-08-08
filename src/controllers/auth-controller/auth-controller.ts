import { IAuthController } from "./protocols";
import { IUserRepository } from "../../repositories/user-repository/protocols";

export class AuthController implements IAuthController {
  constructor(private readonly userRepository: IUserRepository) {}

  async signin() {
    try {
      const users = await this.userRepository.getAll();
      return {
        body: users,
        statusCode: 200,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
  register(): any {
    throw new Error("Method not implemented.");
  }
  logout(): any {
    throw new Error("Method not implemented.");
  }
}
