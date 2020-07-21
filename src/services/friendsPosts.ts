import { MongoLib } from '../lib/mongo';
import { ObjectId } from 'mongodb';
import { id, aggregation } from '../utils/typescript/globals';
import { Post } from '../utils/typescript/postsTypes';

const { getUserPosts, getFollowingPosts, getLikedPosts } = require('../lib/queries/friendsPosts');

export class FriendPostService {
  private DB: MongoLib;
  private collection: string;
  private userId: id;
  constructor(userId: string) {
    this.DB = new MongoLib();
    this.collection = 'users';
    this.userId = new ObjectId(userId);
  }
  async getFollowingPosts(page: number): Promise<Array<Post | void>> {
    const query: aggregation = getFollowingPosts(this.userId, page);
    return await this.DB.aggregation(this.collection, query);
  }

  async getUserPosts(page: number): Promise<Array<Post | void>> {
    const query: aggregation = getUserPosts(this.userId, page);
    return await this.DB.aggregation(this.collection, query);
  }

  async getLikedPosts(page: number): Promise<Array<Post | void>> {
    const query: aggregation = getLikedPosts(this.userId, page);
    return this.DB.aggregation(this.collection, query);
  }

  async likePost(post: string): Promise<void> {
    const postId: id = new ObjectId(post);
    await this.DB.appendFromArray('posts', postId, 'likes', this.userId);
    await this.DB.appendFromArray(this.collection, this.userId, 'liked', postId);
  }
}
