const { use } = require('passport');
const { BasicStrategy } = require('passport-http');
const { unauthorized } = require('@hapi/boom');

const UsersService = require('../../services/user');
const { comparePaswword } = require('../password');

use(
  new BasicStrategy(async function (email, password, callback) {
    const userService = new UsersService();

    try {
      const user = await userService.getUser({ email });

      if (!user) return callback(unauthorized(), false);

      if (!(await comparePaswword(password, user.password))) {
        return callback(unauthorized(), false);
      }

      delete user.password;

      return callback(null, user);
    } catch (err) {
      return callback(err);
    }
  })
);
