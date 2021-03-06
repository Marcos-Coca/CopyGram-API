import { UsersService } from '../services/users';
import passport from 'passport';
import { unauthorized } from '@hapi/boom';
import { JsonWebToken } from '../utils/jwt';
import { Request, Response, NextFunction } from 'express';

import '../utils/auth/basic';
import { verify } from 'jsonwebtoken';
import config from '../config';
import { Token } from '../utils/typescript/jwtTypes';

async function signUp(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { body: user } = req;

  try {
    const userService = new UsersService();
    const existUser = (await userService.getUser({ userName: user.userName })) || [];

    if (existUser.length) return next(unauthorized('User Already Exist'));

    const createdUserId = await userService.createUser(user);
    const tokens = JsonWebToken.createJwtTokens(createdUserId);
    JsonWebToken.sendTokens(res, tokens);
    return res.status(200);
  } catch (err) {
    return next(err);
  }
}

function signIn(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return passport.authenticate('basic', async function (err, user) {
    try {
      if (err || !user) {
        return next(unauthorized('Invalid User or Password'));
      }

      const tokens = JsonWebToken.createJwtTokens(user._id);
      JsonWebToken.sendTokens(res, tokens);
      return res.status(200);
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
}

function refreshTokens(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.cookies;
    const payload = verify(refreshToken, config.refresh_secret as string) as Token;

    const userService = new UsersService();
    const user = userService.findUser(payload.id, { _id: 1 });
    if (!user) throw new Error('Invalid token');

    const tokens = JsonWebToken.createJwtTokens(payload.id);
    JsonWebToken.sendTokens(res, tokens);
    return res.status(200);
  } catch (err) {
    return next(unauthorized(err));
  }
}

export { signIn, signUp, refreshTokens };
