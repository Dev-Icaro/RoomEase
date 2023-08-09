import errorConstants from "../constants/error-constants";

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
