const express = require('express');

const FollowerService = require('../services/follower');
const followerService = new FollowerService();
const validationHandler = require('../middlewares/validationHandler');

const { userIdSchema } = require('../schemas/users');

const router = express.Router();

router.post('/:userId/follow', async function (req, res, next) {
  await followerService.followUser(req.user, req.params.userId);

  res.send('Vale');
});
router.post('/:userId/unfollow', async function (req, res, next) {
  await followerService.unFollowUser(req.user, req.params.userId);

  res.send('Vale');
});

module.exports = router;
