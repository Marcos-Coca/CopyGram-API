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
    const follower = await this.DB.getAll(
      this.collection,
      { _id: new ObjectId(userId) },
      { followers: 1 }
    );
    return follower || [];
  }

  async getFollowing(userId) {
    const following = await this.DB.getAll(
      this.collection,
      { _id: new ObjectId(userId) },
      { following: 1 }
    );
    return following || [];
  }

  async followUser(followerId, followingId) {
    await this.DB.updateDocument(this.collection, followingId, {
      $addToSet: { followers: new ObjectId(followerId) },
    });
    await this.DB.updateDocument(this.collection, followerId, {
      $addToSet: { following: new ObjectId(followerId) },
    });
  }
  async unFollowUser(followerId, followingId) {
    await this.DB.deleteValue(
      this.collection,
      followingId,
      this.field,
      new ObjectId(followerId)
    );
  }

  async getFollowingPosts(userId) {
    const following = await this.getFollowing(userId);
    const posts = await this.DB.getAll('posts', {
      _id: { $in: following },
    });
    return posts;
  }
}

module.exports = FriendShipService;
