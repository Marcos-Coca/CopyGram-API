const joi = require('@hapi/joi');

const userIdSchema = joi.object({
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
});

const userSchema = joi.object({
  userName: joi.string().max(100).required(),
  name: joi.string().min(5).max(30).required(),
  password: joi.string().required(),
});

module.exports = {
  userIdSchema,
  userSchema,
};
