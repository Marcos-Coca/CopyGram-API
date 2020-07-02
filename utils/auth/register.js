const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const LocalStrategy = require('passport-local').Strategy;
const UsersService = require('../../services/user');
const { unauthorized } = require('@hapi/boom');
const { encryptPassword } = require('../password');

passport.use(
  new LocalStrategy(async function (name, email, password, callback) {
    const userService = new UsersService();

    try {
      if (await userService.getUser({ email })) {
        return callback(unauthorized(), false);
      }
      console.log('hola');
      const hashedPassword = await encryptPassword(password);

      const user = { name, email, password: hashedPassword };
      const createdUser = await userService.createUser(user);

      return callback(null, createdUser);
    } catch (err) {
      return callback(err, false);
    }
  })
);
