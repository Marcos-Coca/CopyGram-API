const jwt = require('jsonwebtoken');
const { access_secret, refresh_secret, env } = require('../config/index');
const UsersService = require('../services/user');

function createJwt({ _id, userName }) {
  const payload = {
    _id,
    userName,
  };

  const refreshToken = jwt.sign({ _id }, refresh_secret, {
    expiresIn: '7d',
  });

  const accessToken = jwt.sign(payload, access_secret, {
    expiresIn: '1m',
  });

  return { refreshToken, accessToken };
}

async function refreshTokens(token) {
  try {
    const data = jwt.verify(token, refresh_secret);
    const userService = new UsersService();
    const user = await userService.findUser(data._id);
    if (!user) {
      throw new Error('Invalid Token');
    }
    const { accessToken, refreshToken } = createJwt(user);
    return { accessToken, refreshToken, user };
  } catch (err) {
    return err;
  }
}

function sendCookies(res, { refreshToken, accessToken }) {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: !env,
    secure: !env,
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: !env,
    secure: !env,
  });
}

module.exports = {
  createJwt,
  refreshTokens,
  sendCookies,
};
