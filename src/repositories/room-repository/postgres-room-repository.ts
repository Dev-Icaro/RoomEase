import { Room } from "../../models/room";
import {
  ICreateRoomParams,
  IRoomRespository,
  IUpdateRoomParams,
} from "./protocols";
import db from "../../db";
import { createErrorMessage } from "../../helpers/error-helpers";
import { ApiError } from "../../errors/api-errors";

export class PostgresRoomRepository implements IRoomRespository {
  async getAll(): Promise<Room[]> {
    const query = "SELECT * FROM rooms";
    const result = await db.query(query);

    return result.rows as Room[];
  }

  async getById(id: number): Promise<Room> {
    const query = "SELECT * FROM rooms WHERE id = $1";
    const result = await db.query(query, [id]);

    return result.rows[0] as Room;
  }

  async create(params: ICreateRoomParams): Promise<Room> {
    const { name, capacity, amenities } = params;

    const query = `INSERT INTO rooms (name, capacity, amenities) VALUES ($1, $2, $3)
      RETURNING id, name, capacity, amenities`;

    const result = await db.query(query, [name, capacity, amenities]);

    if (result.rowCount > 0) return result.rows[0] as Room;
    else throw new ApiError(createErrorMessage("Failed to create room."));
  }

  async update(params: IUpdateRoomParams, id: number): Promise<Room> {
    const updatedColumns = Object.keys(params)
      .map((prop, index) => `${prop} = $${index + 2}`)
      .join(",");

    const query = `UPDATE rooms SET ${updatedColumns} WHERE id = $1
      RETURNING *`;

    const result = await db.query(query, [id, ...Object.values(params)]);

    if (result.rowCount > 0) return result.rows[0] as Room;
    else throw new ApiError(createErrorMessage("Failed to update room."));
  }

  async delete(id: number): Promise<Room> {
    const query = "DELETE FROM rooms WHERE id = $1 RETURNING *";
    const result = await db.query(query, [id]);

    if (result.rowCount > 0) return result.rows[0];
    else throw new ApiError(createErrorMessage("Failed to delete room."));
  }
}
