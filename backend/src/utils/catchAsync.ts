import { NextFunction, Request, Response } from "express";

const catchAsync =
  (action: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await action(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export { catchAsync };
