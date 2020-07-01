const MongoLib = require('../lib/mongo');

class PostsService {
  constructor() {
    this.collection = 'pots';
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

  async updatePost(id, data) {
    const updatedPost = await this.DB.update(this.collection, id, data);
    return updatedPost;
  }
  async deletePost(id) {
    const deletedPost = await this.DB.delete(this.collection, id);
    return deletedPost;
  }
}

module.exports = PostsService;
