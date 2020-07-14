const getUserPosts = (userId, page) => [
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
      id: '$post._id',
      title: '$post.title',
      contain: '$post.contain',
      date: '$post.date',
      likes: {
        $cond: {
          if: { $isArray: '$post.likes' },
          then: { $size: '$post.likes' },
          else: 0,
        },
      },
    },
  },
  {
    $sort: { date: -1 },
  },
  {
    $skip: page * 10,
  },
  {
    $limit: 10,
  },
];

const getFollowingPosts = (userId, page) => [
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
      id: '$post._id',
      user: '$user.userName',
      title: '$post.title',
      contain: '$post.contain',
      date: '$post.date',
      likes: {
        $cond: {
          if: { $isArray: '$post.likes' },
          then: { $size: '$post.likes' },
          else: 0,
        },
      },
    },
  },
  {
    $sort: { date: -1 },
  },
  {
    $skip: page * 10,
  },
  {
    $limit: 10,
  },
];

const getLikedPosts = (userId, page) => [
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
      id: '$post._id',
      user: '$user.userName',
      title: '$post.title',
      contain: '$post.contain',
      date: '$post.date',
      likes: {
        $cond: {
          if: { $isArray: '$post.likes' },
          then: { $size: '$post.likes' },
          else: 0,
        },
      },
    },
  },
  {
    $sort: { date: -1 },
  },
  {
    $skip: page * 10,
  },
  {
    $limit: 10,
  },
];

module.exports = {
  getUserPosts,
  getFollowingPosts,
  getLikedPosts,
};
