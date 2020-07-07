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
    const user = await this.DB.get(this.collection, userId);
    return user[this.field] || [];
  }

  async _checkIfFollowing(followerId, followingId) {
    const following = await this.DB.getAll(this.collection, {
      _id: new ObjectId(followingId),
      followers: new ObjectId(followerId),
    });
    return !!following.length;
  }

  async followUser(followerId, followingId) {
    const isFollowing = await this._checkIfFollowing(followerId, followingId);
    if (!isFollowing) {
      await this.DB.appendValue(
        this.collection,
        followingId,
        this.field,
        new ObjectId(followerId)
      );
    }
  }
  async unFollowUser(followerId, followingId) {
    const isFollowing = await this._checkIfFollowing(followerId, followingId);
    if (isFollowing) {
      await this.DB.deleteValue(
        this.collection,
        followingId,
        this.field,
        new ObjectId(followerId)
      );
    }
  }

  async givePostToFollowers(userId, postId) {
    const followers = await this.getFollowers(userId);
    followers.map(async (user) => {
      await this.DB.appendValue(
        this.collection,
        user,
        'followingPosts',
        postId
      );
    });
  }

  async getFollowingPosts(userId = '') {
    const user = await this.userService.findUser(userId);
    return user.followingPosts || [];
  }
}

module.exports = FriendShipService;
