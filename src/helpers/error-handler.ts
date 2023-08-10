import {
  badRequest,
  conflict,
  serverError,
} from "../helpers/http-response-helpers";
import { HttpResponse } from "../controllers/protocols";
import { ErrorMessage } from "../types/error-message";
import { ApiError } from "../errors/api-errors";

export class ErrorHandler {
  static handle(err: unknown): HttpResponse<ErrorMessage> {
    if (err instanceof ApiError) {
      switch (err.name) {
        case "ApiValidationError": {
          return badRequest({ message: err.message, errors: err.errors });
        }
        case "ApiUniqueConstraintError": {
          return conflict({ errors: err.errors });
        }
        default: {
          return serverError();
        }
      }
    } else {
      return serverError();
    }
  }
}
