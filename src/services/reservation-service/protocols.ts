import { Reservation } from "../../models/reservation";
import {
  ICreateReservationParams,
  IUpdateReservationParams,
} from "../../repositories/reservation-repository/protocols";

export interface IReservationService {
  getAll(): Promise<Reservation[]>;
  getById(id: number): Promise<Reservation>;
  create(params: ICreateReservationParams): Promise<Reservation>;
  update(params: IUpdateReservationParams, id: number): Promise<Reservation>;
  delete(id: number): Promise<Reservation>;
}
