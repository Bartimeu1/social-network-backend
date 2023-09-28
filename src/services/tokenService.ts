import * as jwt from 'jsonwebtoken';
import options from '../config';
import Token from '../models/tokenModel';
import { Types } from 'mongoose';

interface ITokenPayload {
  id: Types.ObjectId;
  email: String;
  firstName: String;
}

interface IVerifyJwtPayload {
  id: string;
}

class TokenService {
  generateTokens(payload: ITokenPayload) {
    const accessToken = jwt.sign(payload, options.jwtAccessKey, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, options.jwtRefreshKey, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const newToken = await Token.create({ user: userId, refreshToken });

    return newToken;
  }

  async removeToken(refreshToken: string) {
    await Token.deleteOne({ refreshToken });
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ refreshToken });

    return tokenData;
  }

  validateAccessToken(accessToken: string) {
    try {
      const userData = jwt.verify(accessToken, options.jwtAccessKey) as IVerifyJwtPayload;

      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const userData = jwt.verify(refreshToken, options.jwtRefreshKey) as IVerifyJwtPayload;

      return userData;
    } catch (err) {
      return null;
    }
  }
}

export default new TokenService();
