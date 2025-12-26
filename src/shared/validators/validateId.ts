import { z } from "zod";
import { AppError } from "../errors/AppError";

const idSchema = z.string().uuid("ID deve ser um UUID válido");]

export function validateId(id: string) {
  const result = idSchema.safeParse(id);

  if(!result.success) {
    const errorMessage = result.error.errors[0]!.message || "ID inválido";
    throw new AppError(errorMessage, 400);
  }

  return result.data
}