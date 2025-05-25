import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

interface JwtPayload {
  userId: string;
  role: string;
}

export interface AuthRequest extends ExpressRequest {
  userId?: string;
  userRole?: string;
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId = payload.userId;
    req.userRole = payload.role;
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
