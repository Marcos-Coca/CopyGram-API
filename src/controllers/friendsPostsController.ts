import { Request, Response, NextFunction } from 'express';
import { FriendPostService } from '../services/friendsPosts';

async function getFollowingPosts(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { page } = req.query;
    const { id } = req.payload;
    const friendsPosts = new FriendPostService(id);
    const posts = await friendsPosts.getFollowingPosts(Number(page));
    return res.status(200).json({
      posts,
    });
  } catch (err) {
    next(err);
  }
}

async function likePost(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { postId } = req.params;
    const { id } = req.payload;

    const friendsPosts = new FriendPostService(id);
    await friendsPosts.likePost(postId);
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
}

async function getLikedPosts(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { page = 0 } = req.query;
    const { id } = req.payload;
    const friendsPosts = new FriendPostService(id);
    const posts = await friendsPosts.getLikedPosts(Number(page));
    return res.status(200).json({
      posts,
    });
  } catch (err) {
    next(err);
  }
}

async function getUserPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      params: { userId },
      query: { page = 0 },
    } = req;
    const friendsPosts = new FriendPostService(userId);
    const posts = await friendsPosts.getUserPosts(Number(page));
    return res.status(200).json({
      posts,
    });
  } catch (err) {
    next(err);
  }
}

export { getFollowingPosts, likePost, getLikedPosts, getUserPosts };
