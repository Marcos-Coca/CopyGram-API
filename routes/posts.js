const express = require('express');
const PostsService = require('../services/posts');
const validationHandler = require('../middlewares/validationHandler');
const {
  createPostSchema,
  postIdSchema,
  updatePostSchema,
} = require('../schemas/posts');
const passport = require('passport');
const { unauthorized } = require('@hapi/boom');
const { sendCookies } = require('../utils/jwt');
const { ObjectId } = require('mongodb');

require('../utils/auth/cookieJwt');

function postsApi(app) {
  const router = express.Router();
  app.use('/api/posts', router);

  const postsService = new PostsService();

  router.post('/create', validationHandler(createPostSchema), async function (
    req,
    res,
    next
  ) {
    passport.authenticate('cookie', { session: false }, async function (
      err,
      user,
      tokens
    ) {
      try {
        if (err || !user) {
          return next(unauthorized());
        }
        const { body: post } = req;
        const createdPost = await postsService.createPost({
          ...post,
          user: user._id,
        });

        if (tokens) {
          sendCookies(res, tokens);
        }

        res.status(201).json({
          data: createdPost,
          message: 'post created',
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });

  router.get(
    '/:postId',
    validationHandler({ postId: postIdSchema }),
    async function (req, res, next) {
      passport.authenticate('cookie', { session: false }, async function (
        err,
        user,
        tokens
      ) {
        try {
          if (err || !user) {
            next(unauthorized());
          }
          const { postId } = req.params;

          const post = await postsService.getPost(postId);

          if (tokens) {
            sendCookies(res, tokens);
          }

          res.status(200).json({
            data: post,
            message: 'Post retrieved',
          });
        } catch (err) {
          next(err);
        }
      })(req, res, next);
    }
  );

  router.put(
    '/:postId',
    validationHandler({ postId: postIdSchema }),
    validationHandler(updatePostSchema),
    async function (req, res, next) {
      passport.authenticate('cookie', { session: false }, async function (
        err,
        user,
        tokens
      ) {
        try {
          if (err || !user) {
            next(unauthorized());
          }
          const { postId } = req.params;
          const { body: post } = req;
          const updatedPost = await postsService.updatePost(
            postId,
            post,
            user._id
          );

          if (tokens) {
            sendCookies(res, tokens);
          }

          res.status(200).json({
            data: updatedPost,
            message: 'post created',
          });
        } catch (err) {
          next(err);
        }
      })(req, res, next);
    }
  );

  router.delete(
    '/:postId',
    validationHandler({ postId: postIdSchema }),
    async function (req, res, next) {
      passport.authenticate('cookie', { session: false }, async function (
        err,
        user,
        tokens
      ) {
        try {
          if (err || !user) {
            next(unauthorized());
          }
          const { postId } = req.params;

          const deletedPost = await postsService.deletePost(postId, user._id);

          if (tokens) {
            sendCookies(res, tokens);
          }

          res.status(200).json({
            data: deletedPost,
            message: 'post created',
          });
        } catch (err) {
          next(err);
        }
      })(req, res, next);
    }
  );
}

module.exports = postsApi;
