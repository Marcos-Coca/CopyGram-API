import { aggregation } from '../../utils/typescript/globals';

const postQuerySchema = {
  _id: '$post._id',
  description: '$post.description',
  image: '$post.image',
  date: '$post.date',
  likes: { $cond: { if: { $isArray: '$post.likes' }, then: { $size: '$post.likes' }, else: 0 } },
};

const postsRules = (page: number): aggregation => [
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

export { postQuerySchema, postsRules };
