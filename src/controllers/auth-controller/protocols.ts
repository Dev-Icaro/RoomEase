import { User } from "../../models/user";

export interface IAuthController {
  signin(): any;
  register(): any;
  logout(): any;
}
