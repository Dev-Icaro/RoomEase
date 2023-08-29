import { Reservation } from "../../models/reservation";
import {
  ICreateReservationParams,
  IReservationsRepository,
  IUpdateReservationParams,
} from "./protocols";
import db from "../../db";
import { ApiError } from "../../errors/api-errors";
import { createErrorMessage } from "../../helpers/error-helpers";

export class PostgresReservationRepository implements IReservationsRepository {
  async getAll(): Promise<Reservation[]> {
    const query = "SELECT * FROM reservations";
    const result = await db.query(query);

    return result.rows;
  }

  async getById(id: number): Promise<Reservation> {
    const query = "SELECT * FROM reservations WHERE id = $1";
    const result = await db.query(query, [id]);

    return result.rows[0];
  }

  async create(params: ICreateReservationParams): Promise<Reservation> {
    const query = `INSERT INTO reservations 
      (room_id, user_id, start_time, end_time) 
      values ($1, $2, $3, $4) RETURNING *`;

    const result = await db.query(query, [Object.values(params)]);

    if (result.rowCount > 0) return result.rows[0];
    else
      throw new ApiError(
        createErrorMessage("Failed while creating reservation"),
      );
  }

  async update(
    params: IUpdateReservationParams,
    id: number,
  ): Promise<Reservation> {
    const updatedColumns = Object.keys(params)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(",");

    const query = `UPDATE reservations SET ${updatedColumns} WHERE id = $1 RETURNING *`;
    const result = await db.query(query, [id, ...Object.values(params)]);

    if (result.rowCount > 0) return result.rows[0];
    else
      throw new ApiError(
        createErrorMessage("Failed while updating reservation"),
      );
  }

  async delete(id: number): Promise<Reservation> {
    const query = "DELETE FROM reservations WHERE id = $1 RETURNING *";
    const result = await db.query(query, [id]);

    if (result.rowCount > 0) return result.rows[0];
    else
      throw new ApiError(
        createErrorMessage("Failed while deleting reservation"),
      );
  }
}
