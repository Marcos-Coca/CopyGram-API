const bcrypt = require('bcrypt');

async function encryptPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
}

async function comparePaswword(password, inputPassword) {
  const match = await bcrypt.compare(password, inputPassword);
  return match;
}

module.exports = {
  encryptPassword,
  comparePaswword,
};
