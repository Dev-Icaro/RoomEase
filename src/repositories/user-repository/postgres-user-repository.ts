import { User } from "../../models/user";
import {
  IUpdateUserParams,
  IUserRepository,
  ICreateUserParams,
} from "./protocols";
import db from "../../db";

export class PostgresUserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    const query = "SELECT * FROM users";
    const result = await db.query(query);

    return result.rows as User[];
  }

  async getById(id: number): Promise<User> {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await db.query(query, [id]);

    return result.rows[0] as User;
  }

  async create(params: ICreateUserParams): Promise<User> {
    const { username, email, password } = params;

    const query = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) 
      RETURNING id, username, email, password`;

    const result = await db.query(query, [username, email, password]);

    if (result.rows.length > 0) return result.rows[0] as User;
    else throw new Error("Failed to create user");
  }

  async update(params: IUpdateUserParams, id: number): Promise<User> {
    const updatedColumns = Object.keys(params)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(",");

    const query = `UPDATE users SET ${updatedColumns} WHERE id = $1`;

    await db.query(query, [id, ...Object.values(params)]);

    const user = await this.getById(id);
    if (!user) {
      throw new Error("Failed to update user");
    }

    return user;
  }

  async delete(id: number): Promise<User> {
    const user = await this.getById(id);

    const query = "DELETE FROM users WHERE id = $1";
    const result = await db.query(query, [id]);

    if (result.rows[0] > 0) {
      return user;
    } else {
      throw new Error("Failed to delete user");
    }
  }
}
