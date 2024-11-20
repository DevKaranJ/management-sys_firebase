import {Request, Response, NextFunction} from "express";
import {ZodSchema} from "zod";
import {errorResponse} from "../utils/responseHandler";

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      return res.status(400).json(errorResponse("Invalid request data"));
    }
  };
};
