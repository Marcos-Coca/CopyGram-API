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
} = require('../controllers/postsController');

const router = express.Router();

router.post('/create', validationHandler(createPostSchema), createPost);

router.get(
  '/:postId',
  validationHandler({ postId: postIdSchema }, 'params'),
  getPost
);

router.put(
  '/:postId',
  validationHandler({ postId: postIdSchema }, 'params'),
  validationHandler(updatePostSchema),
  updatePost
);

router.delete(
  '/:postId',
  validationHandler({ postId: postIdSchema }, 'params'),
  deletePost
);

module.exports = router;
