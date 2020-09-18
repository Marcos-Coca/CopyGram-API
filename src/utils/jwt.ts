import jwt from 'jsonwebtoken';
import config from '../config';
import { token, Tokens } from './typescript/jwtTypes';
import { Response } from 'express';

export class JsonWebToken {
  static createJwtTokens(id: string): Tokens {
    const accessToken: token = jwt.sign({ id }, config.access_secret as string, {
      expiresIn: '15m',
    });
    const refreshToken: token = jwt.sign({ id }, config.refresh_secret as string, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  static sendTokens(res: Response, tokens: Tokens) {
    res.json({ refreshToken: tokens.refreshToken, accessToken: tokens.accessToken });
  }
}
