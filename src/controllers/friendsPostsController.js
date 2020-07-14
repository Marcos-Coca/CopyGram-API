const FriendPostService = require('../services/friendsPosts');
const friendsPosts = new FriendPostService();

async function getFollowingPosts(req, res, next) {
  try {
    const { user } = req;
    const posts = await friendsPosts.getFollowingPosts(user);
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
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getFollowingPosts,
  likePost,
};
