import { FriendsUserService } from '../services/friendsUser';
import { NextFunction, Response, Request } from 'express';

async function followUser(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const { id } = req.payload;

    const friendsUser = new FriendsUserService(id);
    await friendsUser.followUser(userId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function unFollowUser(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const { id } = req.payload;

    const friendsUser = new FriendsUserService(id);
    await friendsUser.unFollowUser(userId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function getFollowers(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    const friendsUser = new FriendsUserService(userId);
    const followers = await friendsUser.getFollowers();
    res.status(200).json({
      followers,
    });
  } catch (err) {
    next(err);
  }
}

async function getFollowing(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    const friendsUser = new FriendsUserService(userId);
    const following = await friendsUser.getFollowing();
    res.status(200).json({
      following,
    });
  } catch (err) {
    next(err);
  }
}

async function getUserProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    const friendsUser = new FriendsUserService(userId);
    const userInfo = await friendsUser.getUserProfile();

    res.status(200).json({
      userInfo,
    });
  } catch (err) {
    next(err);
  }
}

async function searchUser(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { userName, page = 0 } = req.query;
    const { id } = req.payload;

    const friendsUser = new FriendsUserService(id);
    const users = await friendsUser.searchUsers(userName, Number(page));

    res.status(200).json({
      users,
    });
  } catch (err) {
    next(err);
  }
}

export { followUser, unFollowUser, getFollowers, getFollowing, getUserProfile, searchUser };
