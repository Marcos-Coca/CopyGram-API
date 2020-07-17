const getUserProfile = (userId) => [
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
      followers: { $size: '$followers' },
      following: { $size: '$following' },
    },
  },
];

const followersOrFollowing = (userId, option) => [
  {
    $match: {
      _id: userId,
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: option,
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
      image: '$user.image',
    },
  },
];

module.exports = { getUserProfile, followersOrFollowing };
