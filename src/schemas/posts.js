const joi = require('@hapi/joi');

const postIdSchema = joi.object({
  postId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
});

const postTitleSchema = joi.string().max(20);
const postContainSchema = joi.string().min(5).max(144);

const createPostSchema = joi.object({
  title: postTitleSchema.required(),
  contain: postContainSchema.required(),
});

const updatePostSchema = joi.object({
  title: postTitleSchema,
  contain: postContainSchema,
});

module.exports = {
  postIdSchema,
  createPostSchema,
  updatePostSchema,
};
