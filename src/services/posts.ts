import { id } from '../utils/typescript/globals';
import { MongoLib } from '../lib/mongo';
import { NewPost, Post, UpdatePost } from '../utils/typescript/postsTypes';

export class PostService {
  private collection: string;
  private DB: MongoLib;
  constructor() {
    this.collection = 'posts';
    this.DB = new MongoLib();
  }

  async getPost(postId: string): Promise<Post | null> {
    const post = await this.DB.get(this.collection, postId);
    return post;
  }

  async createPost(data: NewPost): Promise<id> {
    const createdPostId = await this.DB.create(this.collection, {
      ...data,
      likes: [],
      date: new Date(),
    });
    return createdPostId;
  }

  async updatePost(postId: string, data: UpdatePost): Promise<string> {
    const updatedPost = await this.DB.update(this.collection, postId, data);
    return updatedPost;
  }
  async deletePost(postId: string): Promise<string> {
    const deletedPost = await this.DB.delete(this.collection, postId);
    return deletedPost;
  }
}

module.exports = PostService;
