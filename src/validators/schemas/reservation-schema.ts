import Yup from "yup";
import { ErrorFormatter } from "../../helpers/error-helpers";
import { roomExists, userExists } from "../generic-validators";
import { PostgresRoomRepository } from "../../repositories/room-repository/postgres-room-repository";
import { PostgresUserRepository } from "../../repositories/user-repository/postgres-user-repository";

export const asyncReservationSchema = Yup.object().shape({
  roomId: Yup.number()
    .required()
    .test("roomExists", ErrorFormatter.notFound("room"), async (value) => {
      return !roomExists(value, new PostgresRoomRepository());
    }),
  userId: Yup.number()
    .required()
    .test("userExists", ErrorFormatter.notFound("user"), async (value) => {
      return !userExists(value, new PostgresUserRepository());
    }),
  startTime: Yup.number().required(),
  endTime: Yup.number().required(),
});
