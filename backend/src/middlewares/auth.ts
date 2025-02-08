import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

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

  const publicKey = process.env.KEYCLOAK_PUBLIC_KEY;

  // const decodedToken = jwt.verify(token, publicKey!, {
  //   algorithms: ["RS256"],
  // });

  // console.log(decodedToken);

  next();
};

export { auth };
