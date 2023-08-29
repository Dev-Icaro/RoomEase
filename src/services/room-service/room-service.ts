import errorConstants from "../../constants/error-constants";
import { ApiNotFoundError, ApiValidationError } from "../../errors/api-errors";
import {
  ErrorFormatter,
  createErrorMessage,
} from "../../helpers/error-helpers";
import { Room } from "../../models/room";
import {
  ICreateRoomParams,
  IRoomRespository,
  IUpdateRoomParams,
} from "../../repositories/room-repository/protocols";
import { roomSchema } from "../../validators/schemas/room-schema";
import { IRoomService } from "./protocols";

export class RoomService implements IRoomService {
  constructor(private readonly roomRepository: IRoomRespository) {}

  async getAll(): Promise<Room[]> {
    return await this.roomRepository.getAll();
  }

  async getById(id: number): Promise<Room> {
    const room = await this.roomRepository.getById(id);

    if (!room)
      throw new ApiNotFoundError(
        createErrorMessage(ErrorFormatter.notFound("room")),
      );

    return room;
  }

  async create(params: ICreateRoomParams): Promise<Room> {
    if (Object.keys(params).length === 0)
      throw new ApiValidationError(
        createErrorMessage(errorConstants.MISSING_REQ_PARAMS),
      );

    await roomSchema.validate(params).catch((err) => {
      throw new ApiValidationError(
        createErrorMessage("ValidationError", err.errors),
      );
    });

    return this.roomRepository.create(params);
  }

  async update(params: IUpdateRoomParams, id: number): Promise<Room> {
    const roomExists = await this.roomRepository.getById(id);
    if (!roomExists)
      throw new ApiNotFoundError(
        createErrorMessage(ErrorFormatter.notFound("room")),
      );

    if (Object.keys(params).length === 0)
      throw new ApiValidationError(
        createErrorMessage(ErrorFormatter.missingArg("params")),
      );

    for (const key in params) {
      await roomSchema.validateAt(key, params).catch((err) => {
        throw new ApiValidationError(createErrorMessage(err));
      });
    }

    return await this.roomRepository.update(params, id);
  }

  async delete(id: number): Promise<Room> {
    const room = await this.roomRepository.getById(id);
    if (!room)
      throw new ApiNotFoundError(
        createErrorMessage(ErrorFormatter.notFound("room")),
      );

    return await this.roomRepository.delete(id);
  }
}
