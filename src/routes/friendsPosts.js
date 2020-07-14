const router = require('express').Router();

const validationHandler = require('../middlewares/validationHandler');
const { postIdSchema } = require('../schemas/posts');
const {
  likePost,
  getLikedPosts,
  getFollowingPosts,
} = require('../controllers/friendsPostsController');

router.get('/', getFollowingPosts);
router.get('/like', getLikedPosts);
router.post('/like/:postId', validationHandler(postIdSchema), likePost);

module.exports = router;
