import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../exceptions/httpError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: `Unexpected Error: ${err.message}` });
};
