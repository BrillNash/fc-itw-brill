import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.format();
      res.status(400).json({ error: 'Validation failed', details: errors });
      return 
    }

    req.body = result.data; 
    next();
  };
};
