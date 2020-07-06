const MongoLib = require('../lib/mongo');
const UsersService = require('./user');

class PostService {
  constructor() {
    this.collection = 'posts';
    this.userService = new UsersService();
    this.DB = new MongoLib();
  }

  async getPost(postId) {
    const post = await this.DB.get(this.collection, postId);
    return post;
  }

  async createPost(data) {
    const createdPostId = await this.DB.create(this.collection, data);
    await this.userService.createPost(data.user, createdPostId);
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
