const router = require('express').Router();

const validationHandler = require('../middlewares/validationHandler');
const { postIdSchema } = require('../schemas/posts');
const {
  likePost,
  getLikedPosts,
  getFollowingPosts,
  getUserPosts,
} = require('../controllers/friendsPostsController');

router.get('/', getFollowingPosts);
router.get('/like', getLikedPosts);
router.get('/:userId', getUserPosts);
router.post('/like/:postId', validationHandler(postIdSchema), likePost);

module.exports = router;
