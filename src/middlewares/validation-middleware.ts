import { z } from "zod";
import { Request,Response,NextFunction } from "express";

export const validate = <
  T extends z.ZodObject<{
    body?: z.ZodType;
    params?: z.ZodType;
    query?: z.ZodType;
  }>
>(
  schema: T
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    req.body = result.data.body;

    next();
  };
};