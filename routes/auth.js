const express = require('express');
const bomm = require('@hapi/boom');
const { userSchema } = require('../schemas/users');

const UsersService = require('../services/user');
const validationHandler = require('../middlewares/validationHandler');
const { createJwt } = require('../utils/jwt');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const userService = new UsersService();

  router.post('/sign-up', validationHandler(userSchema), async function (
    req,
    res,
    next
  ) {
    const { body: user } = req;

    try {
      const isUser = await userService.getUser({ email: user.email });
      if (isUser.length) {
        throw bomm.unauthorized();
      }

      const createdUserId = await userService.createUser(user);

      const { refreshToken, accessToken } = createJwt(createdUserId, user.name);

      res.cookie('refresh-token', refreshToken, { httpOnly: true });
      res.cookie('access-token', accessToken, { httpOnly: true });
      res.status(201).json({ id: createdUserId });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = authApi;
