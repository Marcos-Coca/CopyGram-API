import config from '../../config';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { token } from '../typescript/jwtTypes';
import { unauthorized } from '@hapi/boom';

export async function authenticateToken(req: any, res: Response, next: NextFunction) {
  try {
    const authHeaders = req.headers['authorization'] || '';
    const accessToken: token = authHeaders.split(' ')[1];
    const payload = verify(accessToken, config.access_secret as string);
    req.payload = payload;
    return next();
  } catch (err) {
    return next(unauthorized(err));
  }
}
