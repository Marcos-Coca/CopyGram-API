const express = require('express');

const FriendShipService = require('../services/friendShip');
const validationHandler = require('../middlewares/validationHandler');
const { userIdSchema } = require('../schemas/users');
const UsersService = require('../services/user');
const FriendsUserService = require('../services/friendsUser');
const friendShipService = new FriendShipService();

const friendsUser = new FriendsUserService();

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const { user } = req;
    const posts = await friendShipService.getFollowingPosts(user);
    res.status(200).json({
      posts,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async function (req, res, next) {
  try {
    const {
      params: { userId },
    } = req;
    const userService = new UsersService();
    const user = await friendsUser.getUserProfile(userId);
    const posts = await friendShipService.getUserPosts(userId);
    console.log(user);
    res.status(200).json({
      posts,
      // userInfo,
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/:userId/follow',
  validationHandler(userIdSchema, 'params'),
  async function (req, res, next) {
    try {
      const {
        user,
        params: { userId },
      } = req;
      await friendShipService.followUser(user, userId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/:userId/unfollow',
  validationHandler(userIdSchema, 'params'),
  async function (req, res, next) {
    try {
      const {
        user,
        params: { userId },
      } = req;
      await friendShipService.unFollowUser(user, userId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/:userId',
  validationHandler(userIdSchema, 'params'),
  async function (req, res, next) {
    try {
      const {
        params: { userId },
      } = req;

      const followers = await friendShipService.getFollowers(userId);

      res.status(200).json({
        data: followers,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
