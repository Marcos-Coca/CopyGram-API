const router = require('express').Router();
const validationHandler = require('../middlewares/validationHandler');
const { userIdSchema } = require('../schemas/users');

const {
  followUser,
  unFollowUser,
  getFollowers,
  getFollowing,
  getUserProfile,
  searchUser,
} = require('../controllers/friendsUserController');

router.post('/search/', searchUser);

router.get('/:userId', validationHandler(userIdSchema), getUserProfile);

router.post('/:userId/follow', validationHandler(userIdSchema), followUser);

router.post('/:userId/unfollow', validationHandler(userIdSchema), unFollowUser);

router.get('/:userId/followers', validationHandler(userIdSchema), getFollowers);

router.get('/:userId/following', validationHandler(userIdSchema), getFollowing);

module.exports = router;
