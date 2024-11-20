import {Request, Response, NextFunction} from "express";
import {auth} from "../config/firebase";
import {errorResponse} from "../utils/responseHandler";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json(errorResponse("No token provided"));
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || "Unknown",
      name: decodedToken.name || "Unknown",
    };
    return next();
  } catch (error) {
    return res.status(401).json(errorResponse("Invalid token"));
  }
};
