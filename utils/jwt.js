const jwt = require('jsonwebtoken');
const { access_secret } = require('../config/index');

function createJwt(_id, name) {
  const payload = {
    sub: _id,
    name,
  };

  const accessToken = jwt.sign(payload, access_secret, {
    expiresIn: '15m',
  });

  return accessToken;
}

module.exports = {
  createJwt,
};
