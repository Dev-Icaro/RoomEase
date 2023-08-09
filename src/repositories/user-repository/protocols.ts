import { User } from "../../models/user";

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  create(user: ICreateUserParams): Promise<User>;
  update(user: IUpdateUserParams, id: number): Promise<User>;
  delete(id: number): Promise<User>;
}

export interface IUpdateUserParams {
  username?: string;
  password?: string;
  email?: string;
}

export interface ICreateUserParams {
  username: string;
  password: string;
  email: string;
}
