const FriendsUserService = require('../services/friendsUser');
const friendsUser = new FriendsUserService();

async function followUser(req, res, next) {
  try {
    const {
      user,
      params: { userId },
    } = req;

    await friendsUser.followUser(user, userId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function unFollowUser(req, res, next) {
  try {
    const {
      user,
      params: { userId },
    } = req;

    await friendsUser.unFollowUser(user, userId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function getFollowers(req, res, next) {
  try {
    const {
      params: { userId },
    } = req;

    const followers = await friendsUser.getFollowers(userId);

    res.status(200).json({
      followers,
    });
  } catch (err) {
    next(err);
  }
}

async function getFollowing(req, res, next) {
  try {
    const {
      params: { userId },
    } = req;

    const following = await friendsUser.getFollowing(userId);

    res.status(200).json({
      following,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { followUser, unFollowUser, getFollowers, getFollowing };
