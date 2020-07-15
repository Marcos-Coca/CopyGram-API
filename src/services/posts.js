const MongoLib = require('../lib/mongo');

class PostService {
  constructor() {
    this.collection = 'posts';
    this.DB = new MongoLib();
  }

  async getPost(postId) {
    const post = await this.DB.get(this.collection, postId);
    return post;
  }

  async createPost(data) {
    const createdPostId = await this.DB.create(this.collection, {
      ...data,
      likes: [],
      date: new Date(),
    });
    return createdPostId;
  }

  async updatePost(postId, data) {
    const updatedPost = await this.DB.update(this.collection, postId, data);
    return updatedPost;
  }
  async deletePost(postId) {
    const deletedPost = await this.DB.delete(this.collection, postId);
    return deletedPost;
  }
}

module.exports = PostService;
