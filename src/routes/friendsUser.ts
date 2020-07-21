import { Router } from 'express';
const router = Router();
import { validationHandler } from '../utils/middlewares/validationHandler';
import { userIdSchema } from '../utils/schemas/users';

import { followUser, unFollowUser, getFollowers, getFollowing, getUserProfile, searchUser } from '../controllers/friendsUserController';

router.post('/search/', searchUser);

router.get('/:userId', validationHandler(userIdSchema), getUserProfile);

router.post('/:userId/follow', validationHandler(userIdSchema), followUser);

router.post('/:userId/unfollow', validationHandler(userIdSchema), unFollowUser);

router.get('/:userId/followers', validationHandler(userIdSchema), getFollowers);

router.get('/:userId/following', validationHandler(userIdSchema), getFollowing);

module.exports =  router;
