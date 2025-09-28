import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { FailResponse } from "../utils/responseTypes";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(
      new FailResponse({
        message: "Access denied. No valid token format found.",
      })
    );
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    return res
      .status(401)
      .json(new FailResponse({ message: "Invalid or expired token." }));
  }
};
