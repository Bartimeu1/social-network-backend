import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import { IUser } from '../types/baseTypes';
import { HttpError } from '../exceptions/httpError';
import tokenService from './tokenService';
import UserDto from '../dtos/userDto';

class UserService {
  async registration(user: IUser) {
    const { email, password } = user;

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw HttpError.UserExists(`User with email ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const newUser = await User.create({ ...user, password: hashedPassword });

    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError.BadRequest(`User with email ${email} is not exists`);
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw HttpError.BadRequest('Wrong password');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw HttpError.Unauthorized();
    }
    
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw HttpError.Unauthorized();
    }
    
    const user = await User.findById(userData.id);
    if (user) {
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      };
    }
  }
}

export default new UserService();
