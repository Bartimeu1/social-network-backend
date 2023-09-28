import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../exceptions/httpError';
import TokenService from 'src/services/tokenService';

export const authMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(HttpError.Unauthorized());
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      return next(HttpError.Unauthorized());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(HttpError.Unauthorized());
    }
    
    next();
  } catch (err) {
    return next(HttpError.Unauthorized());
  }
};
