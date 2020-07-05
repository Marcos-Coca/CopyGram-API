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

  async followAUser(userId, userToFollowId) {
    await this.DB.appendValue(
      this.collection,
      userToFollowId,
      'followers',
      userId
    );
  }

  async givePostToFollowers(userId, postId) {
    const user = await this.userService.findUser(userId);
    user.followers.push(userId);
    user.followers.map(async (user) => {
      await this.DB.appendValue(this.collection, user, 'followingPots', postId);
    });
  }

  async getFollowingPosts(userId = '') {
    const user = await this.userService.findUser(userId);
    const posts = await this.DB.getAll('posts', {
      _id: ObjectId(...user.followingPots),
    });

    return posts;
  }
}

module.exports = FollowerService;
