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
  async getFollowingPosts(userId) {
    const aggregation = getFollowingPosts(userId);
    return await this.DB.agregation(this.collection, aggregation);
  }

  async getUserPosts(userId) {
    const aggregation = getUserPosts(new ObjectId(userId));
    return await this.DB.agregation(this.collection, aggregation);
  }

  async getLikedPosts(userId) {
    const aggregation = getLikedPosts(userId);
    return this.DB.agregation(this.collection, aggregation);
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
