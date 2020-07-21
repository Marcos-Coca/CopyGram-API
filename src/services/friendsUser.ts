import { MongoLib } from '../lib/mongo';
import { ObjectId } from 'mongodb';
import { getUserProfile, followersOrFollowing } from '../lib/queries/friendsUser';
import { id, aggregation } from '../utils/typescript/globals';
import { UserProfile } from '../utils/typescript/userTypes';

export class FriendsUserService {
  private DB: MongoLib;
  private collection: string;
  private userId: id;
  constructor(userId: string) {
    this.DB = new MongoLib();
    this.collection = 'users';
    this.userId = new ObjectId(userId);
  }
  async getUserProfile() {
    const query: aggregation = getUserProfile(this.userId);
    const posts: number = await this.DB.countDocuments('posts', { user: this.userId });
    const [userInfo] = await this.DB.aggregation(this.collection, query);
    return { ...userInfo, posts };
  }

  async getFollowers(): Promise<Array<UserProfile | void>> {
    const follower = await this.DB.aggregation(this.collection, followersOrFollowing(this.userId, 'followers'));
    return follower || [];
  }

  async getFollowing(): Promise<Array<UserProfile | void>> {
    const following = await this.DB.aggregation(this.collection, followersOrFollowing(this.userId, 'following'));
    return following || [];
  }

  async followUser(followingId: string): Promise<void> {
    const following: id = new ObjectId(followingId);
    await this.DB.appendFromArray(this.collection, this.userId, 'following', following);
    await this.DB.appendFromArray(this.collection, following, 'followers', this.userId);
  }

  async unFollowUser(followingId: string): Promise<void> {
    const following: id = new ObjectId(followingId);
    await this.DB.deleteFromArray(this.collection, this.userId, 'following', following);
    await this.DB.deleteFromArray(this.collection, following, 'followers', this.userId);
  }

  async searchUsers(text: string, page: number): Promise<UserProfile> {
    return this.DB.textSearch(this.collection, text, { userName: 1, image: 1, name: 1 }, 10, page);
  }
}
