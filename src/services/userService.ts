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
}

export default new UserService();
