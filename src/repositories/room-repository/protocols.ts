import { Room } from "../../models/room";

export interface IRoomRespository {
  getAll(): Promise<Room[]>;
  getById(id: number): Promise<Room>;
  create(params: ICreateRoomParams): Promise<Room>;
  update(params: IUpdateRoomParams, id: number): Promise<Room>;
  delete(id: number): Promise<Room>;
}

export interface ICreateRoomParams {
  name: string;
  capacity: number;
  amenities?: string;
}

export interface IUpdateRoomParams {
  name?: string;
  capacity?: number;
  amenities?: string;
}
