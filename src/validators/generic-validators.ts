import { ErrorFormatter } from "../helpers/error-helpers";
import validator from "validator";
import { ValidationResult } from "../helpers/validation-result";
import { IUserRepository } from "../repositories/user-repository/protocols";
import { IRoomRespository } from "../repositories/room-repository/protocols";

export function validateId(id: number): ValidationResult {
  const result = new ValidationResult();

  if (validator.isEmpty(String(id))) {
    result.addError(ErrorFormatter.missingArg("id"));
  }

  if (!validator.isNumeric(String(id))) {
    result.addError(ErrorFormatter.invalidArg("id"));
  }

  return result;
}

export async function userExists(
  id: number,
  userRepository: IUserRepository,
): Promise<boolean> {
  const user = await userRepository.getById(id);
  return user !== null;
}

export async function roomExists(
  id: number,
  roomRepository: IRoomRespository,
): Promise<boolean> {
  const room = await roomRepository.getById(id);
  return room !== null;
}
