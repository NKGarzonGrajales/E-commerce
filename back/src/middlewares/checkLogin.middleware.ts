import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";
import { UserRepository } from "../repositories/user.repository";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ClientError("Token is required", 401));
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new ClientError("Invalid authorization header", 401));
  }

  let decoded: { userId: number };

  try {
    decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch (error) {
    return next(new ClientError("Invalid token", 401));
  }

  const user = await UserRepository.findOneBy({
    id: decoded.userId,
  });

  if (!user) {
    return next(new ClientError("User not found", 401));
  }

  req.user = {
    id: user.id,
    role: user.role,
  };

  console.log("Token Check OK");

  next();
};

export default checkLogin;