const MongoLib = require('../lib/mongo');
const { ObjectId } = require('mongodb');
const {
  getUserProfile,
  followersOrFollowing,
} = require('../lib/queries/friendsUser');

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
    const follower = await this.DB.aggregation(
      this.collection,
      followersOrFollowing(new ObjectId(userId), 'followers')
    );
    return follower || [];
  }

  async getFollowing(userId) {
    const following = await this.DB.aggregation(
      this.collection,
      followersOrFollowing(new ObjectId(userId), 'following')
    );
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
      new ObjectId(followingId),
      'followers',
      new ObjectId(followerId)
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
      new ObjectId(followingId),
      'followers',
      followerId
    );
  }

  async searchUsers(text, page) {
    return this.DB.textSearch(
      this.collection,
      text,
      { userName: 1, image: 1 },
      10,
      page
    );
  }
}

module.exports = FriendsUserService;
