const passport = require('passport');
const { unauthorized } = require('@hapi/boom');

const { sendCookies } = require('../utils/jwt');

require('../utils/auth/cookieJwt');

function cookieAuth(req, res, next) {
  passport.authenticate('cookie', { session: false }, function (
    err,
    user,
    tokens
  ) {
    try {
      if (err || !user) {
        return next(unauthorized());
      }
      if (tokens) {
        sendCookies(res, tokens);
      }

      req.user = user._id;

      return next();
    } catch (err) {
      next(err);
    }
  })(req, res, next);
}

module.exports = cookieAuth;
