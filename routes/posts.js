const express = require('express');
const PostsService = require('../services/posts');
const validationHandler = require('../middlewares/validationHandler');
const {
  createPostSchema,
  postIdSchema,
  updatePostSchema,
} = require('../schemas/posts');
const FollowerService = require('../services/follower');

function postsApi(app) {
  const router = express.Router();
  app.use('/api/posts', router);

  const postsService = new PostsService();
  // const followerService = new FollowerService();

  router.post('/create', validationHandler(createPostSchema), async function (
    req,
    res,
    next
  ) {
    const { body: post } = req;

    try {
      const createdPost = await postsService.createPost(post);

      res.status(200).json({
        data: createdPost,
        message: 'post created',
      });
    } catch (err) {
      next(err);
    }
  });
  router.get(
    '/:postId',
    validationHandler({ postId: postIdSchema }),
    async function (req, res, next) {
      const { postId } = req.params;
      try {
        const post = await postsService.getPost(postId);

        res.status(200).json({
          data: post,
          message: 'Post retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.put(
    '/:postId',
    validationHandler({ postId: postIdSchema }),
    validationHandler(updatePostSchema),
    async function (req, res, next) {
      const { postId } = req.params;
      const { body: post } = req;

      try {
        const updatedPost = await postsService.updatePost(postId, post);

        res.status(200).json({
          data: updatedPost,
          message: 'post created',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.delete(
    '/:postId',
    validationHandler({ postId: postIdSchema }),
    async function (req, res, next) {
      const { postId } = req.params;

      try {
        const deletedPost = await postsService.deletePost(postId);

        res.status(200).json({
          data: deletedPost,
          message: 'post created',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = postsApi;
