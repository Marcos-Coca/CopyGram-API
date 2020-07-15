const MongoLib = require('../lib/mongo');
const { ObjectId } = require('mongodb');
const { getUserProfile } = require('../lib/queries/friendsUser');

class FriendsUserService {
  constructor() {
    this.DB = new MongoLib();
    this.collection = 'users';
  }

  async getUserProfile(userId) {
    const user = new ObjectId(userId);
    const query = getUserProfile(user);
    const posts = await this.DB.countDocuments('posts', { user });
    const [userInfo] = await this.DB.aggregation(this.collection, query);
    return { ...userInfo, posts };
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

  async searchUsers(text, page) {
    return this.DB.textSearch(this.collection, text, { userName: 1 }, 10, page);
  }
}

module.exports = FriendsUserService;
