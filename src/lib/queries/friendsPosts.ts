import { postQuerySchema, postsRules } from './querySchemas';
import { aggregation, id } from '../../utils/typescript/globals';

const getUserPosts = (userId: id, page: number): aggregation => [
  {
    $match: {
      _id: userId,
    },
  },
  {
    $lookup: {
      from: 'posts',
      localField: '_id',
      foreignField: 'user',
      as: 'post',
    },
  },
  {
    $unwind: '$post',
  },

  {
    $project: {
      ...postQuerySchema,
    },
  },
  ...postsRules(page),
];

const getFollowingPosts = (userId: id, page: number): aggregation => [
  {
    $match: {
      _id: userId,
    },
  },
  {
    $lookup: {
      from: 'posts',
      localField: 'following',
      foreignField: 'user',
      as: 'post',
    },
  },
  {
    $unwind: '$post',
  },
  {
    $lookup: {
      from: 'users',
      localField: 'post.user',
      foreignField: '_id',
      as: 'user',
    },
  },
  {
    $unwind: '$user',
  },
  {
    $project: {
      user: '$user.userName',
      userId: '$user._id',
      userImage: '$user.profileImage',
      ...postQuerySchema,
    },
  },
  ...postsRules(page),
];

const getLikedPosts = (userId: id, page: number): aggregation => [
  {
    $match: {
      _id: userId,
    },
  },
  {
    $lookup: {
      from: 'posts',
      localField: 'liked',
      foreignField: '_id',
      as: 'post',
    },
  },
  {
    $unwind: '$post',
  },

  {
    $project: {
      user: '$user.userName',
      userId: '$user._id',
      userImage: '$user.profileImage',
      ...postQuerySchema,
    },
  },
  ...postsRules(page),
];

export { getUserPosts, getFollowingPosts, getLikedPosts };
