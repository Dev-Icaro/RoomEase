import { User } from "../../models/user";
import { IUserRepository } from "./protocols";
import { PostgresClient } from "../../database/postgres";

export class PostgresUserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    const query = "SELECT user_id, username, email, password FROM users";
    const result = await PostgresClient.client.query(query);

    return result.rows as User[];
  }

  async getById(): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async create(): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async update(): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async delete(): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
