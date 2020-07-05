const express = require('express');
const validationHandler = require('../middlewares/validationHandler');

const {
  createPostSchema,
  postIdSchema,
  updatePostSchema,
} = require('../schemas/posts');

const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require('./routersController/postsController');

const router = express.Router();

router.post('/create', validationHandler(createPostSchema), createPost);

router.get('/:postId', validationHandler({ postId: postIdSchema }), getPost);

router.put(
  '/:postId',
  validationHandler({ postId: postIdSchema }),
  validationHandler(updatePostSchema),
  updatePost
);

router.delete(
  '/:postId',
  validationHandler({ postId: postIdSchema }),
  deletePost
);

module.exports = router;
