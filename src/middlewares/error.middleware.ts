import { Request, Response, NextFunction } from "express";
import Responses from "../config/responses";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.message);
  const response = Responses.serverError("Internal Server Error");
  res.status(response.statusCode).json(response);
};

export default errorMiddleware;
