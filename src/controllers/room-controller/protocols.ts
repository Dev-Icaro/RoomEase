import { Room } from "../../models/room";
import {
  ICreateRoomParams,
  IUpdateRoomParams,
} from "../../repositories/room-repository/protocols";
import { ErrorMessage } from "../../types/error-message";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IRoomController {
  getAll(): Promise<HttpResponse<Room[] | ErrorMessage>>;

  getById(
    httpRequest: HttpRequest<null>
  ): Promise<HttpResponse<Room | ErrorMessage>>;

  create(
    httpRequest: HttpRequest<ICreateRoomParams>
  ): Promise<HttpResponse<Room | ErrorMessage>>;

  update(
    httpRequest: HttpRequest<IUpdateRoomParams>
  ): Promise<HttpResponse<Room | ErrorMessage>>;
  
  delete(
    httpRequest: HttpRequest<null>
  ): Promise<HttpResponse<Room | ErrorMessage>>;
}
