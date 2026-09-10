import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ClientError("Token is required", 401));
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new ClientError("Invalid authorization header", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.body.userId = decoded.userId;
  } catch (error) {
    return next(new ClientError("Invalid token", 401));
  }

  console.log("Token Check OK");

  next();
};

export default checkLogin;
