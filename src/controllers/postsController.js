const PostService = require('../services/posts');
const FollowerService = require('../services/follower');

const postService = new PostService();

async function createPost(req, res, next) {
  const followerService = new FollowerService();
  try {
    const { body: post, user } = req;

    const createdPostId = await postService.createPost({ ...post, user });
    await followerService.givePostToFollowers(user, createdPostId);

    res.status(201).json({
      message: 'post created',
    });
  } catch (err) {
    next(err);
  }
}

async function getPost(req, res, next) {
  try {
    const { postId } = req.params;

    const post = await postService.getPost(postId);

    res.status(200).json({
      data: post,
      message: 'Post retrieved',
    });
  } catch (err) {
    next(err);
  }
}

async function updatePost(req, res, next) {
  try {
    const {
      body: post,
      user,
      params: { postId },
    } = req;
    const updatedPost = await postService.updatePost(postId, post);

    res.status(200).json({
      data: updatedPost,
      message: 'post created',
    });
  } catch (err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    const {
      params: { postId },
      user,
    } = req;

    const deletedPost = await postService.deletePost(postId);

    res.status(200).json({
      data: deletedPost,
      message: 'post created',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
