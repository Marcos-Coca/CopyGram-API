const express = require('express');
const PostsService = require('../services/posts');

function postsApi(app) {
  const router = express.Router();
  app.use('/api/posts', router);

  const postsService = new PostsService();

  router.post('/create', async function (req, res) {
    const { data } = req.body;

    try {
      const post = await postsService.createPost(data);

      res.status(200).json({
        data: post,
        message: 'post created',
      });
    } catch (err) {
      return new Error('Tu Mai');
    }
  });

  router.get('/:postId', async function (req, res) {
    const { postId } = req.query;
    try {
      const post = await postsService.getPost(postId);

      res.status(200).json({
        data: post,
        message: 'Post retrieved',
      });
    } catch (err) {
      return new Error('Tu Mai');
    }
  });
}

module.exports = postsApi;
