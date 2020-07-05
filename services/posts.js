const MongoLib = require('../lib/mongo');
const { unauthorized } = require('@hapi/boom');

class PostsService {
  constructor() {
    this.collection = 'posts';
    this.DB = new MongoLib();
  }

  async getPost(id) {
    const post = await this.DB.get(this.collection, id);
    return post;
  }

  async createPost(data) {
    const createdPost = await this.DB.create(this.collection, data);
    return createdPost;
  }

  async updatePost(id, data, user) {
    const post = await this.getPost(id);
    if (post.user !== user) {
      return unauthorized();
    }
    const updatedPost = await this.DB.update(this.collection, id, data);
    return updatedPost;
  }
  async deletePost(id, user) {
    const post = await this.getPost(id);
    if (post.user !== user) {
      return unauthorized();
    }
    const deletedPost = await this.DB.delete(this.collection, id);
    return deletedPost;
  }
}

module.exports = PostsService;
