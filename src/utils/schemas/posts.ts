import joi, { Schema, ObjectSchema } from '@hapi/joi';

const postIdSchema: ObjectSchema = joi.object({
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

export { postIdSchema, createPostSchema, updatePostSchema };
