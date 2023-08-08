import { User } from "../../models/user";

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(): Promise<User>;
  create(): Promise<User>;
  update(): Promise<User>;
  delete(): Promise<User>;
}
