import { ApiNotFoundError, ApiValidationError } from "../../errors/api-errors";
import {
  ErrorFormatter,
  createErrorMessage,
} from "../../helpers/error-helpers";
import { Reservation } from "../../models/reservation";
import {
  ICreateReservationParams,
  IReservationsRepository,
  IUpdateReservationParams,
} from "../../repositories/reservation-repository/protocols";
import { asyncReservationSchema } from "../../validators/schemas/reservation-schema";
import { IReservationService } from "./protocols";

export class ReservationService implements IReservationService {
  constructor(
    private readonly reservationRepository: IReservationsRepository,
  ) {}

  async getAll(): Promise<Reservation[]> {
    return await this.reservationRepository.getAll();
  }

  async getById(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.getById(id);
    if (!reservation) {
      throw new ApiNotFoundError(
        createErrorMessage(ErrorFormatter.notFound("room")),
      );
    }

    return reservation;
  }

  async create(params: ICreateReservationParams): Promise<Reservation> {
    await asyncReservationSchema
      .validate(params, { abortEarly: false })
      .catch((err) => {
        throw new ApiValidationError(
          createErrorMessage("ValidationError", err.errors),
        );
      });

    return this.reservationRepository.create(params);
  }

  async update(
    params: IUpdateReservationParams,
    id: number,
  ): Promise<Reservation> {
    for (const key in params) {
      await asyncReservationSchema.validateAt(key, params).catch((err) => {
        throw new ApiValidationError(
          createErrorMessage("ValidationError", err.errors),
        );
      });
    }

    return this.reservationRepository.update(params, id);
  }

  async delete(id: number): Promise<Reservation> {}
}
