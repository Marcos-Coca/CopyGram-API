import { Router } from 'express';
const router = Router();

import { validationHandler } from '../utils/middlewares/validationHandler';
import { postIdSchema } from '../utils/schemas/posts';
import { likePost, getLikedPosts, getFollowingPosts, getUserPosts } from '../controllers/friendsPostsController';

router.get('/', getFollowingPosts);
router.get('/like', getLikedPosts);
router.get('/:userId', getUserPosts);
router.post('/like/:postId', validationHandler(postIdSchema), likePost);

module.exports = router;
