import { User } from "../../models/user";
import {
  ICreateUserParams,
  IUpdateUserParams,
} from "../../repositories/user-repository/protocols";

export interface IUserService {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  getByEmail(email: string): Promise<User>;
  create(params: ICreateUserParams): Promise<User>;
  update(params: IUpdateUserParams, id: number): Promise<User>;
  delete(id: number): Promise<User>;
}
