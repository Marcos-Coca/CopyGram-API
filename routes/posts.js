const express = require('express');

const PostsService = require('../services/posts');
const validationHandler = require('../middlewares/validationHandler');
const {
  createPostSchema,
  postIdSchema,
  updatePostSchema,
} = require('../schemas/posts');

function postsApi(app) {
  const router = express.Router();
  app.use('/api/posts', router);

  const postsService = new PostsService();

  router.post('/create', validationHandler(createPostSchema), async function (
    req,
    res,
    next
  ) {
    try {
      const { body: post, user } = req;

      await postsService.createPost({ ...post, user });

      res.status(201).json({
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
      try {
        const { postId } = req.params;

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
      try {
        const {
          body: post,
          user,
          params: { postId },
        } = req;
        const updatedPost = await postsService.updatePost(postId, post, user);

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
      try {
        const {
          params: { postId },
          user,
        } = req;

        const deletedPost = await postsService.deletePost(postId, user);

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
