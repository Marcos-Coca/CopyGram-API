const express = require('express');
const passport = require('passport');
const bomm = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const UsersService = require('../services/user');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const userService = new UsersService();

  router.post('/sign-up', async function (req, res, next) {
    const { body: user } = req;

    try {
      if (await userService.getUser({ email: user.email })) {
        throw bomm.unauthorized();
      }

      const createdUserId = await userService.createUser(user);

      res.status(201).json({
        data: createdUserId,
        message: 'user created',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = authApi;
