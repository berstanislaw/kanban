import { jwtDecode } from "jwt-decode";
import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../services/user.service";

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const bearer = req.header("Authorization");
  const token = bearer?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const decodedToken = jwtDecode(token);
  const { email } = decodedToken;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
};

export { auth };
