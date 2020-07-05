const CookieStrategy = require('passport-cookie');
const passport = require('passport');
const { access_secret } = require('../../config');
const { verify } = require('jsonwebtoken');
const { unauthorized } = require('@hapi/boom');
const { refreshTokens } = require('../jwt');

passport.use(
  new CookieStrategy(
    {
      cookieName: 'accessToken',
      passReqToCallback: true,
    },
    async function ({ cookies }, accessToken, callback) {
      const { refreshToken } = cookies;
      if (!accessToken || !refreshToken) {
        return callback(unauthorized(), false, null);
      }

      try {
        const user = verify(accessToken, access_secret);
        return callback(null, user, null);
      } catch {}

      try {
        const tokens = await refreshTokens(refreshToken);
        console.log(tokens);
        return callback(null, tokens.user, {
          tokens: { accessToken, refreshToken },
        });
      } catch (err) {
        return callback(err, false, null);
      }
    }
  )
);
