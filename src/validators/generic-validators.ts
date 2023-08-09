import { ErrorFormatter } from "../helpers/error-formatter";
import validator from "validator";

export function validateId(id: number): string {
  let error: string = "";

  if (validator.isEmpty(String(id))) {
    error = ErrorFormatter.missingArg("id");
  }

  if (!validator.isNumeric(String(id))) {
    error = ErrorFormatter.invalidArg("id");
  }

  return error;
}
