import { ApiValidationError } from "../../errors/api-errors";
import {
  ErrorFormatter,
  ErrorHandler,
  createErrorMessage,
} from "../../helpers/error-helpers";
import { ok } from "../../helpers/http-response-helpers";
import { Room } from "../../models/room";
import {
  ICreateRoomParams,
  IUpdateRoomParams,
} from "../../repositories/room-repository/protocols";
import { IRoomService } from "../../services/room-service/protocols";
import { ErrorMessage } from "../../types/error-message";
import { HttpResponse, HttpRequest } from "../protocols";
import { IRoomController } from "./protocols";

export class RoomController implements IRoomController {
  constructor(private readonly roomService: IRoomService) {}

  async getAll(): Promise<HttpResponse<Room[] | ErrorMessage>> {
    try {
      const rooms = await this.roomService.getAll();
      return ok(rooms);
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }

  async getById(
    httpRequest: HttpRequest<null>
  ): Promise<HttpResponse<Room | ErrorMessage>> {
    try {
      const { id } = httpRequest.params;

      if (!id)
        throw new ApiValidationError(
          createErrorMessage(ErrorFormatter.missingArg("id"))
        );

      const room = await this.roomService.getById(id);
      return ok(room);
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }

  async create(
    httpRequest: HttpRequest<ICreateRoomParams>
  ): Promise<HttpResponse<Room | ErrorMessage>> {
    try {
      const { body } = httpRequest;

      if (!body)
        throw new ApiValidationError(
          createErrorMessage(ErrorFormatter.missingArg("body"))
        );

      const room = await this.roomService.create(body);
      return ok(room);
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }

  async update(
    httpRequest: HttpRequest<IUpdateRoomParams>
  ): Promise<HttpResponse<Room | ErrorMessage>> {
    try {
      const { body, params } = httpRequest;

      if (!body)
        throw new ApiValidationError(
          createErrorMessage(ErrorFormatter.missingArg("body"))
        );

      if (!params.id)
        throw new ApiValidationError(
          createErrorMessage(ErrorFormatter.missingArg("id"))
        );

      const room = await this.roomService.update(body, params.id);
      return ok(room);
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }

  async delete(
    httpRequest: HttpRequest<null>
  ): Promise<HttpResponse<Room | ErrorMessage>> {
    try {
      const { params } = httpRequest;

      if (!params.id)
        throw new ApiValidationError(
          createErrorMessage(ErrorFormatter.missingArg("id"))
        );

      const room = await this.roomService.delete(params.id);
      return ok(room);
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }
}
