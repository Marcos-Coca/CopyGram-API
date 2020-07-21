import { id, aggregation } from '../../utils/typescript/globals';

const getUserProfile = (userId: id): aggregation => [
  {
    $match: {
      _id: userId,
    },
  },
  {
    $project: {
      _id: '$user._id',
      image: '$profileImage',
      userName: '$userName',
      name: '$name',
      followers: { $cond: { if: { $isArray: '$followers' }, then: { $size: '$followers' }, else: 0 } },
      following: { $cond: { if: { $isArray: '$following' }, then: { $size: '$following' }, else: 0 } },
    },
  },
];

const followersOrFollowing = (userId: id, field: string): aggregation => [
  {
    $match: {
      _id: userId,
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: field,
      foreignField: '_id',
      as: 'user',
    },
  },
  {
    $unwind: '$user',
  },
  {
    $project: {
      _id: '$user._id',
      userName: '$user.userName',
      name: '$user.name',
      image: '$user.image',
    },
  },
];

export { getUserProfile, followersOrFollowing };
