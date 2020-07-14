const router = require('express').Router();

const friendsUserController = require('../controllers/friendsUserController');
const {
  followUser,
  unFollowUser,
} = require('../controllers/friendsUserController');

router.post('/:userId/follow', followUser);

router.post('/:userId/unfollow', unFollowUser);
