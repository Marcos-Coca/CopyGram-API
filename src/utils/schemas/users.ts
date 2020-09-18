import { Schema } from '@hapi/joi';

import joi from '@hapi/joi';

const userIdSchema: Schema = joi.object({
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
});

const userSchema: Schema = joi.object({
  userName: joi.string().max(100).required(),
  name: joi.string().min(5).max(30).required(),
  password: joi.string().required(),
});

const updateUserSchema: Schema = joi.object({
  userName: joi.string().max(100),
  name: joi.string().min(5).max(30),
  password: joi.string().required(),
  image: joi.any(),
});

export { userIdSchema, userSchema, updateUserSchema };
