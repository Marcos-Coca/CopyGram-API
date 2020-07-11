const MongoLib = require('../lib/mongo');
const UserService = require('./user');
const { ObjectId } = require('mongodb');

class FriendShipService {
  constructor() {
    this.DB = new MongoLib();
    this.collection = 'users';
    this.field = 'followers';
    this.userService = new UserService();
  }

  async getFollowers(userId) {
    const follower = await this.DB.get(this.collection, userId, {
      followers: 1,
      _id: 0,
    });
    return follower || [];
  }

  async getFollowing(userId) {
    const following = await this.DB.get(this.collection, userId, {
      following: 1,
      _id: 0,
    });
    return following || [];
  }

  async followUser(followerId, followingId) {
    await this.DB.updateDocument(this.collection, followingId, {
      $addToSet: { followers: new ObjectId(followerId) },
    });
    await this.DB.updateDocument(this.collection, followerId, {
      $addToSet: { following: new ObjectId(followingId) },
    });
    return;
  }
  async unFollowUser(followerId, followingId) {
    await this.DB.updateDocument(this.collection, followingId, {
      $pull: { followers: new ObjectId(followerId) },
    });
    await this.DB.updateDocument(this.collection, followerId, {
      $pull: { following: new ObjectId(followingId) },
    });
  }

  async getFollowingPosts(userId) {
    const aggregation = [
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
        },
      },
    ];
    return await this.DB.agregation(this.collection, aggregation);
  }

  async getUserPosts(userId) {
    const aggregation = [
      {
        $match: {
          _id: new ObjectId(userId),
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
        },
      },
    ];

    return await this.DB.agregation(this.collection, aggregation);
  }
}

module.exports = FriendShipService;
