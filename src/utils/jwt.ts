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
    res.cookie('refreshtoken', tokens.refreshToken, {
      httpOnly: !config.env,
      secure: !config.env,
    });
    res.json({ token: tokens.accessToken });
  }
}
