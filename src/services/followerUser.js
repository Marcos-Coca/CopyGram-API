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
    const user = await this.DB.get(this.collection, userId);
    return user.followers || [];
  }

  async followAUser(userId, userToFollowId) {
    await this.DB.appendValue(
      this.collection,
      userToFollowId,
      'followers',
      ObjectId(userId)
    );
  }
}

module.exports = FollowerService;
