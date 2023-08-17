import { IAuthController } from "./protocols";
import { IAuthService } from "../../services/auth-service/protocols";

export class AuthController implements IAuthController {
  constructor(private readonly authService: IAuthService) {}

  async signin() {
    throw new Error("Method not implemented.");
  }
  register(): any {
    throw new Error("Method not implemented.");
  }
  logout(): any {
    throw new Error("Method not implemented.");
  }
}
