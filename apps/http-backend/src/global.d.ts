// src/global.d.ts

import { userId } from "./types/usertypes";

declare global {
  namespace Express {
    interface Request {
      userId?: userId;
      validated?: any;
    }
  }
}
