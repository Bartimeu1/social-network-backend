import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserService from '../services/userService';
import { HttpError } from '../exceptions/httpError';
import { msecInDay } from '../utils/constants';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return next(
          HttpError.BadRequest('Validation Error', validationErrors.array()),
        );
      }

      const userData = await UserService.registration(req.body);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: msecInDay * 30,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (err) {
      next(err);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: msecInDay * 30,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (err) {
      next(err);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await UserService.logout(refreshToken);

      res.clearCookie('refreshToken');
      return res.status(200).json('OK');
    } catch (err) {
      next(err);
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      
      if (userData) {
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: msecInDay * 30,
          httpOnly: true,
        });
        res.status(200).json(userData);
      }
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
