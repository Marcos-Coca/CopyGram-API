import { Request, Response, NextFunction } from 'express';

import { uploadImage } from '../utils/cloudinary';
import { PostService } from '../services/posts';

async function createPost(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { body: post, file } = req;
    const { id } = req.payload;

    const postService = new PostService();
    const { url, public_id } = await uploadImage(file.path);
    const createdPostId = await postService.createPost({
      ...post,
      user: id,
      image: { url, public_id },
    });

    res.status(201).json({
      id: createdPostId,
    });
  } catch (err) {
    next(err);
  }
}

async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const { postId } = req.params;

    const postService = new PostService();
    const post = await postService.getPost(postId);

    res.status(200).json({
      post,
    });
  } catch (err) {
    next(err);
  }
}

async function updatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      body: post,
      params: { postId },
    } = req;
    const postService = new PostService();
    const updatedPost = await postService.updatePost(postId, post);

    res.status(200).json({
      updatedPost,
    });
  } catch (err) {
    next(err);
  }
}

async function deletePost(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      params: { postId },
    } = req;

    const postService = new PostService();
    const deletedPost = await postService.deletePost(postId);

    res.status(200).json({
      deletedPost,
    });
  } catch (err) {
    next(err);
  }
}

export { createPost, getPost, updatePost, deletePost };
