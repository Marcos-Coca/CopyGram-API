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

      const accessToken = createJwt(createdUserId, user.name);

      res.status(201).json({ accessToken, id: createdUserId });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = authApi;
