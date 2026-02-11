import { IResponse } from "../types";

class Responses {
  public static ok<T>(data: T): IResponse<T> {
    return {
      error: false,
      statusCode: 200,
      data,
      message: "Success",
    };
  }

  public static badRequest(message: string): IResponse<null> {
    return {
      error: true,
      statusCode: 400,
      message,
    };
  }

  public static unauthorized(message: string): IResponse<null> {
    return {
      error: true,
      statusCode: 401,
      message,
    };
  }

  public static forbidden(message: string): IResponse<null> {
    return {
      error: true,
      statusCode: 403,
      message,
    };
  }

  public static notFound(message: string): IResponse<null> {
    return {
      error: true,
      statusCode: 404,
      message,
    };
  }

  public static serverError(message: string): IResponse<null> {
    return {
      error: true,
      statusCode: 500,
      message,
    };
  }
}

export default Responses;
