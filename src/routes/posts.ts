import { Router } from 'express';
import { validationHandler } from '../utils/middlewares/validationHandler';
import { createPostSchema, postIdSchema, updatePostSchema } from '../utils/schemas/posts';
import { createPost, getPost, updatePost, deletePost } from '../controllers/postsController';

const router = Router();

router.post('/create', validationHandler(createPostSchema), createPost);

router.get('/:postId', validationHandler(postIdSchema, 'params'), getPost);

router.put('/:postId', validationHandler(postIdSchema, 'params'), validationHandler(updatePostSchema), updatePost);

router.delete('/:postId', validationHandler(postIdSchema, 'params'), deletePost);

module.exports = router;
