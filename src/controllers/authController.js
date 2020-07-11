const UsersService = require('../services/user');
const passport = require('passport');
const { unauthorized } = require('@hapi/boom');
const { createJwt, sendCookies } = require('../utils/jwt');

const userService = new UsersService();

require('../utils/auth/basic');

async function signUp(req, res, next) {
  const { body: user } = req;

  try {
    const createdUserId = await userService.createUser(user);

    const { refreshToken, accessToken } = createJwt({
      ...user,
      _id: createdUserId,
    });

    sendCookies(res, { refreshToken, accessToken });

    return res.status(201).json({ id: createdUserId });
  } catch (err) {
    next(err);
  }
}

async function signIn(req, res, next) {
  passport.authenticate('basic', function (err, user) {
    try {
      if (err || !user) {
        next(unauthorized());
      }

      const { refreshToken, accessToken } = createJwt(user);

      sendCookies(res, { refreshToken, accessToken });

      return res.status(201).json({ id: user._id });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
}

module.exports = {
  signIn,
  signUp,
};
