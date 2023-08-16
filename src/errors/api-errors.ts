import { ErrorMessage } from "../types/error-message";

export class ApiError extends Error {
  public errors?: string[];

  constructor(errorMessage: ErrorMessage) {
    super(errorMessage.message);
    this.errors = errorMessage?.errors;
    this.name = "ApiError";
  }
}

export class ApiValidationError extends ApiError {
  constructor(errorMessage: ErrorMessage) {
    super(errorMessage);
    this.name = "ApiValidationError";
  }
}

export class ApiUniqueConstraintError extends ApiError {
  constructor(errorMessage: ErrorMessage) {
    super(errorMessage);
    this.name = "ApiUniqueConstraintError";
  }
}

export class ApiNotFoundError extends ApiError {
  constructor(errorMessage: ErrorMessage) {
    super(errorMessage);
    this.name = "ApiNotFoundError";
  }
}

export class ApiUnauthorizedError extends ApiError {
  constructor(errorMessage: ErrorMessage) {
    super(errorMessage);
    this.name = "ApiUnauthorizedError";
  }
}
