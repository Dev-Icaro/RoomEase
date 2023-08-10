import { HttpResponse } from "../controllers/protocols";
import { HttpStatusCode } from "../enums/status-code-enum";

export const ok = <T>(body: T): HttpResponse<T> => {
  return {
    body,
    statusCode: HttpStatusCode.OK,
  };
};

export const badRequest = <T>(body: T): HttpResponse<T> => {
  return {
    body,
    statusCode: HttpStatusCode.BAD_REQUEST,
  };
};

export const serverError = <T>(): HttpResponse<T> => {
  return {
    body: "Something went wrong",
    statusCode: HttpStatusCode.SERVER_ERROR,
  };
};

export const notFound = <T>(body: T): HttpResponse<T> => {
  return {
    body,
    statusCode: HttpStatusCode.NOT_FOUND,
  };
};

export const created = <T>(body: T): HttpResponse<T> => {
  return {
    body,
    statusCode: HttpStatusCode.CREATED,
  };
};

export const conflict = <T>(body: T): HttpResponse<T> => {
  return {
    body,
    statusCode: HttpStatusCode.CREATED,
  };
};
