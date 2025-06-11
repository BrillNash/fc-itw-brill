import { Request, Response, NextFunction } from "express";
import { BaseAppError } from "../errors/baseAppError";

export const globalErrorHandler = (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Oops. Something went wrong.";

  const details = error instanceof BaseAppError ? error.error : undefined;

  response.status(status).json({
    error: message,
    details,
  });
};
