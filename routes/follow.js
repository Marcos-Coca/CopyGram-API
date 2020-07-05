const express = require('express');

const FollowerService = require('../services/follower');
const followerService = new FollowerService();
const validationHandler = require('../middlewares/validationHandler');

const { userIdSchema } = require('../schemas/users');

const router = express.Router();

router.post('/:userId', async function (req, res, next) {
  await followerService.followAUser(req.user, req.params.userId);

  res.send('Vale');
});

module.exports = router;
