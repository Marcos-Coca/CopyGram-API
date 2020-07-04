const express = require('express');
const bomm = require('@hapi/boom');
const { userSchema } = require('../schemas/users');

const UsersService = require('../services/user');
const validationHandler = require('../middlewares/validationHandler');
const { createJwt } = require('../utils/jwt');
const passport = require('passport');

require('../utils/auth/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const userService = new UsersService();

  router.post('/sign-in', async function (req, res, next) {
    passport.authenticate('basic', function (err, user) {
      try {
        if (err || !user) {
          next(bomm.unauthorized());
        }

        const { refreshToken, accessToken } = createJwt(user._id, user.name);

        res.cookie('refresh-token', refreshToken, { httpOnly: true });
        res.cookie('access-token', accessToken, { httpOnly: true });
        return res.status(201).json({ id: user._id });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });

  router.post('/sign-up', validationHandler(userSchema), async function (
    req,
    res,
    next
  ) {
    const { body: user } = req;

    try {
      const [isUser] = await userService.getUser({ email: user.email });
      if (isUser) {
        throw bomm.unauthorized();
      }

      const createdUserId = await userService.createUser(user);

      const { refreshToken, accessToken } = createJwt(createdUserId, user.name);

      res.cookie('refresh-token', refreshToken, { httpOnly: true });
      res.cookie('access-token', accessToken, { httpOnly: true });
      return res.status(201).json({ id: createdUserId });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = authApi;
