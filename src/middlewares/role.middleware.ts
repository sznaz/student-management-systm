import { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware";

export const authorizeAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
  next();
};
