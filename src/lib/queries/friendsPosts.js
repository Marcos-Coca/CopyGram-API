const getUserPosts = (userId) => [
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
];

const getFollowingPosts = (userId) => [
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
];

const getLikedPosts = (userId) => [
  {
    $match: {
      _id: userId,
    },
  },
  {
    $lookup: {
      from: 'posts',
      localField: 'liked',
      foreignField: 'postId',
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
];

module.exports = {
  getUserPosts,
  getFollowingPosts,
  getLikedPosts,
};
