import errorConstants from "../constants/error-constants";
import { ErrorMessage } from "../types/error-message";

export class ValidationResult {
  public errors: string[] = [];

  addError(error: string) {
    this.errors.push(error);
  }

  isEmpty(): boolean {
    return this.errors.length === 0;
  }

  toArray(): string[] {
    return this.errors;
  }

  toErrorMessage(): ErrorMessage {
    return {
      message: errorConstants.VALIDATION_ERROR,
      errors: this.errors,
    };
  }
}
