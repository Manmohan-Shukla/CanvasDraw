import { NextFunction, Request, Response } from "express"; //@ts-ignore

import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
// import { MyJwtPayload } from "./types/usertypes.";
export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] ?? "";

  const decoded = jwt.verify(token, JWT_SECRET);
  if (decoded) {
    //@ts-ignore
    // how to update the structure of request object in express
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({
      message: "UNauthorized",
    });
  }
}
