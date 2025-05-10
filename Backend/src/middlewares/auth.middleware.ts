import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { STATUS_CODES, MESSAGES } from "../utils/constants";

interface JwtPayload {
  id: string;
  role: string;
}

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies["token"];
      if (!token) {
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ message: MESSAGES.ERROR.UNAUTHORIZED });
      }

      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      if (!allowedRoles.includes(payload.role)) {
        return res
          .status(STATUS_CODES.FORBIDDEN)
          .json({ message: MESSAGES.ERROR.FORBIDDEN });
      }

      (req as any).userId = payload.id;
      (req as any).userType = payload.role;

      next();
    } catch (err: any) {
      const isJwtError =
        err.name === "JsonWebTokenError" || err.name === "TokenExpiredError";
      return res
        .status(isJwtError ? STATUS_CODES.UNAUTHORIZED : STATUS_CODES.FORBIDDEN)
        .json({
          message: isJwtError ? MESSAGES.ERROR.INVALID_TOKEN : err.message,
        });
    }
  };
};
