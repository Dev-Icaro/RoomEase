import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ message: "Missing authorization header." });

  const token = authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Missing token." });

  try {
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
