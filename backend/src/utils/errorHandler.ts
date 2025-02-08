import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { AppError } from "./error";

const handlePrismaError = (err: PrismaClientKnownRequestError): AppError => {
  switch (err.code) {
    case "P2002":
      // handling duplicate key errors
      return new AppError(`Duplicate field value: ${err.meta?.target}`, 409);
    case "P2014":
      // handling invalid id errors
      return new AppError(`Invalid ID: ${err.meta?.target}`, 422);
    case "P2003":
      // handling invalid data errors
      return new AppError(`Invalid input data: ${err.meta?.target}`, 422);
    default:
      // handling all other errors
      new AppError(`Something went wrong: ${err.message}`, 500);
  }

  return new AppError("Internal server error", 500);
};

const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (err instanceof PrismaClientKnownRequestError) {
    const error = handlePrismaError(err);

    return res.status(error.status).json({ error: { message: error.message } });
  }

  res.status(err.status).json({ error: { message: err.message } });
};

export { errorHandler };
