import {
  badRequest,
  conflict,
  notFound,
  serverError,
} from "../helpers/http-response-helpers";
import { HttpResponse } from "../controllers/protocols";
import { ErrorMessage } from "../types/error-message";
import errorConstants from "../constants/error-constants";
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
        case "ApiNotFoundError": {
          return notFound({ message: err.message, errors: err.errors });
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

export class ErrorFormatter {
  static notFound(placeholder: string): string {
    return errorConstants.NOT_FOUND.replace("{placeholder}", placeholder);
  }

  static missingArg(placeholder: string): string {
    return errorConstants.MISSING_ARG.replace("{placeholder}", placeholder);
  }

  static invalidArg(placeholder: string): string {
    return errorConstants.INVALID_ARG.replace("{placeholder}", placeholder);
  }
}

export function createErrorMessage(
  message: string,
  errors?: string[]
): ErrorMessage {
  return { message: message, errors: errors };
}
