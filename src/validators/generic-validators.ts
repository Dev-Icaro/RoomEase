import { ErrorFormatter } from "../helpers/error-helpers";
import validator from "validator";
import { ValidationResult } from "../helpers/validation-result";

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
