const PostService = require('../services/posts');
const uploadImage = require('../utils/cloudinary');

const postService = new PostService();

async function createPost(req, res, next) {
  try {
    const { body: post, user, file } = req;

    const { url, public_id } = await uploadImage(file.path);
    const createdPostId = await postService.createPost({
      ...post,
      user,
      image: { url, public_id },
    });

    res.status(201).json({
      data: createdPostId,
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
