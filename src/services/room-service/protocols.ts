import { Room } from "../../models/room";
import {
  ICreateRoomParams,
  IUpdateRoomParams,
} from "../../repositories/room-repository/protocols";

export interface IRoomService {
  getAll(): Promise<Room[]>;
  getById(id: number): Promise<Room>;
  create(params: ICreateRoomParams): Promise<Room>;
  update(params: IUpdateRoomParams, id: number): Promise<Room>;
  delete(id: number): Promise<Room>;
}
