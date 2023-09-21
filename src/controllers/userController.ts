import { Request, Response } from 'express';
import UserService from '../services/userService';
import { msecInDay } from '../utils/constants';

class UserController {
  async registration(req: Request, res: Response) {
    try {
      const userData = await UserService.registration(req.body);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: msecInDay * 30,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (err) {
      console.log(err);
      res.status(409).send((err as Error).message);
    }
  }
}

export default new UserController();
