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
      _id: '$post._id',
      description: '$post.description',
      image: '$post.image',
      date: '$post.date',
      likes: {
        $size: '$post.likes',
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
      _id: '$post._id',
      user: '$user.userName',
      userId: '$user._id',
      userImage: '$user.profileImage',
      image: '$post.image',
      description: '$post.description',
      date: '$post.date',
      likes: {
        $size: '$post.likes',
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
      _id: '$post._id',
      user: '$user.userName',
      userId: '$user._id',
      userImage: '$user.profileImage',
      image: '$post.image',
      description: '$post.description',
      date: '$post.date',
      likes: {
        $size: '$post.likes',
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
