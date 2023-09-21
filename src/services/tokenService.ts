import * as jwt from 'jsonwebtoken';
import options from '../config';
import Token from '../models/tokenModel';
import { Types } from 'mongoose';

interface ITokenPayload {
  id: Types.ObjectId;
  email: String;
  firstName: String;
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
    console.log(userId)
    const tokenData = await Token.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const newToken = await Token.create({ user: userId, refreshToken });

    return newToken;
  }
}

export default new TokenService();
