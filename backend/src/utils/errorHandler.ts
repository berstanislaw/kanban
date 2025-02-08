import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";

const handlePrismaError = (err: PrismaClientKnownRequestError) => {
  switch (err.code) {
    case "P2002":
      // handling duplicate key errors
      return {
        error: { message: `Duplicate field value: ${err.meta?.target}` },
      };
    case "P2014":
      // handling invalid id errors
      return { error: { message: `Invalid ID: ${err.meta?.target}` } };
    case "P2003":
      // handling invalid data errors
      return { error: { message: `Invalid input data: ${err.meta?.target}` } };
    default:
      // handling all other errors
      return { error: { message: `Something went wrong: ${err.message}` } };
  }
};

const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log("ta entrando aqui");

  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

export { errorHandler };
