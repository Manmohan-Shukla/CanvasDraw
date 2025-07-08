import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
//@ts-ignore
import { JWT_SECRET } from "@repo/backend-common/config";

// const JWT_SECRET1 = process.env.JWT_SECRET || JWT_SECRET;

interface AuthRequest extends Request {
  userId?: string;
}

export function middleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1]; // Remove "Bearer"

  try {
    //@ts-ignore
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT error:", error);
    return res.status(403).json({ message: "Unauthorized - Invalid token" });
  }
}
