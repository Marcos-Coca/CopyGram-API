const express = require('express');

const FriendShipService = require('../services/friendShip');
const friendShipService = new FriendShipService();

const router = express.Router();

router.post('/:userId/follow', async function (req, res, next) {
  try {
    const {
      user,
      params: { userId },
    } = req;
    await friendShipService.followUser(user, userId);
    res.status(204);
  } catch (err) {
    next(err);
  }
});
router.post('/:userId/unfollow', async function (req, res, next) {
  try {
    const {
      user,
      params: { userId },
    } = req;
    await friendShipService.unFollowUser(user, userId);
    res.status(204);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/followers', async function (req, res, next) {
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
});

module.exports = router;
