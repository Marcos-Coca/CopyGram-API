const jwt = require('jsonwebtoken');
const { access_secret, silent_secret } = require('../config/index');
const UsersService = require('../services/user');

function createJwt(_id, name) {
  const payload = {
    sub: _id,
    name,
  };

  const refreshToken = jwt.sign({ id: _id }, silent_secret, {
    expiresIn: '7d',
  });

  const accessToken = jwt.sign(payload, access_secret, {
    expiresIn: '15m',
  });

  return { refreshToken, accessToken };
}

async function refreshToken(token) {
  try {
    const data = jwt.verify(token, silent_secret);
    const userService = new UsersService();
    const user = await userService.findUser(data.id);
    if (!user) {
      throw new Error('Invalid Token');
    }
    const { accessToken, refreshToken } = createJwt(user._id, user.name);
    return { accessToken, refreshToken };
  } catch (err) {
    return null;
  }
}

module.exports = {
  createJwt,
  refreshToken,
};
