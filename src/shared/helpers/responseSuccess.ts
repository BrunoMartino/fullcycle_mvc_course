import { Response } from "express";
import { success } from "zod";

export function responseSuccess(
  res: Response,
  data: any,
  message = "Success",
  status = 200
) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}
