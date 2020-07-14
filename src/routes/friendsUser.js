const router = require('express').Router();

const {
  followUser,
  unFollowUser,
} = require('../controllers/friendsUserController');

router.post('/:userId/follow', followUser);

router.post('/:userId/unfollow', unFollowUser);
