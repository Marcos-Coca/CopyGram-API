const MongoLib = require('../lib/mongo');
const UserService = require('./user');
const { ObjectId } = require('mongodb');

class FollowerService {
  constructor() {
    this.DB = new MongoLib();
    this.collection = 'users';
    this.field = 'followwing';
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
    await this.DB.appendFromArray(
      this.collection,
      followerId,
      'following',
      new ObjectId(followingId)
    );
    await this.DB.appendFromArray(
      this.collection,
      followerId,
      'follower',
      new ObjectId(followingId)
    );
  }
  async unFollowUser(followerId, followingId) {
    await this.DB.deleteFromArray(
      this.collection,
      followerId,
      'following',
      new ObjectId(followingId)
    );
    await this.DB.deleteFromArray(
      this.collection,
      followerId,
      'follower',
      new ObjectId(followingId)
    );
  }
}

module.exports = FollowerService;
