const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const { unauthorized } = require('@hapi/boom');

const UsersService = require('../../services/user');
const { comparePaswword } = require('../password');

passport.use(
  new BasicStrategy(async function (userName, password, callback) {
    const userService = new UsersService();

    try {
      const [user] = await userService.getUser({ userName });

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
