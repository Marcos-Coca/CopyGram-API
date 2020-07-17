const postQuerySchema = {
  _id: '$post._id',
  description: '$post.description',
  image: '$post.image',
  date: '$post.date',
  likes: {
    $size: '$post.likes',
  },
};

const postsRules = (page) => [
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

module.exports = { postQuerySchema, postsRules };
