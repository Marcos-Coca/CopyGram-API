const joi = require('@hapi/joi');

const postIdSchema = joi.object({
  postId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
});

const postImageSchema = joi.object({
  image: joi.required(),
});

const postDescriptionSchema = joi.string().min(5).max(144);

const createPostSchema = joi.object({
  description: postDescriptionSchema.required(),
});

const updatePostSchema = joi.object({
  description: postDescriptionSchema,
});

module.exports = {
  postIdSchema,
  createPostSchema,
  updatePostSchema,
};
