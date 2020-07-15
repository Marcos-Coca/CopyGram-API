const FriendPostService = require('../services/friendsPosts');
const friendsPosts = new FriendPostService();

async function getFollowingPosts(req, res, next) {
  try {
    const {
      user,
      query: { page = 0 },
    } = req;
    const posts = await friendsPosts.getFollowingPosts(user, page);
    res.status(200).json({
      posts,
    });
  } catch (err) {
    next(err);
  }
}

async function likePost(req, res, next) {
  try {
    const {
      params: { postId },
      user,
    } = req;

    await friendsPosts.likePost(postId, user);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function getLikedPosts(req, res, next) {
  try {
    const {
      user,
      query: { page = 0 },
    } = req;
    const posts = await friendsPosts.getLikedPosts(user, page);
    res.status(200).json({
      posts,
    });
  } catch (err) {
    next(err);
  }
}

async function getUserPosts(req, res, next) {
  try {
    const {
      params: { userId },
      query: { page = 0 },
    } = req;

    const posts = await friendsPosts.getUserPosts(userId, page);
    res.status(200).json({
      posts,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getFollowingPosts,
  likePost,
  getLikedPosts,
  getUserPosts,
};
