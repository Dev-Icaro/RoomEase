import { Reservation } from "../../models/reservation";

export interface IReservationsRepository {
  getAll(): Promise<Reservation[]>;
  getById(id: number): Promise<Reservation>;
  create(params: ICreateReservationParams): Promise<Reservation>;
  update(params: IUpdateReservationParams, id: number): Promise<Reservation>;
  delete(id: number): Promise<Reservation>;
}

export interface ICreateReservationParams {
  roomId: number;
  userId: number;
  startTime: number;
  endTime: number;
}

export interface IUpdateReservationParams {
  roomId?: number;
  userId?: number;
  startTime?: number;
  endTime?: number;
}
