const MongoLib = require('../lib/mongo');
const { ObjectId } = require('mongodb');

const {
  getUserPosts,
  getFollowingPosts,
  getLikedPosts,
} = require('../lib/queries/friendsPosts');

class FriendPostService {
  constructor() {
    this.DB = new MongoLib();
    this.collection = 'users';
  }
  async getFollowingPosts(userId, page) {
    const query = getFollowingPosts(userId, page);
    return await this.DB.aggregation(this.collection, query);
  }

  async getUserPosts(userId) {
    const query = getUserPosts(new ObjectId(userId));
    return await this.DB.aggregation(this.collection, query);
  }

  async getLikedPosts(userId, page) {
    const query = getLikedPosts(userId, page);
    return this.DB.aggregation(this.collection, query);
  }

  async likePost(postId, userId) {
    await this.DB.appendFromArray(
      'posts',
      postId,
      'likes',
      new ObjectId(userId)
    );
    await this.DB.appendFromArray(
      this.collection,
      userId,
      'liked',
      new ObjectId(postId)
    );
  }
}

module.exports = FriendPostService;
