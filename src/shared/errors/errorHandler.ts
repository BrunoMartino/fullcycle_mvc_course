import { NextFunction, Request, response, Response } from "express";
import { AppError } from "./AppError";

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  console.error("Middleware de errors acionado", error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error("Erro não tratado:", error);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
