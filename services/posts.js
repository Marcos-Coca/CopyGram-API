const MongoLib = require('../lib/mongo');
const { unauthorized } = require('@hapi/boom');
const UsersService = require('./user');
const FollowerService = require('./follower');

class PostService {
  constructor() {
    this.collection = 'posts';
    this.userService = new UsersService();
    this.followerService = new FollowerService();
    this.DB = new MongoLib();
  }

  async getPost(id) {
    const post = await this.DB.get(this.collection, id);
    return post;
  }

  async createPost(data) {
    const createdPostId = await this.DB.create(this.collection, data);
    await this.followerService.givePostToFollowers(data.user, createdPostId);
    await this.userService.createPost(data.user, createdPostId);
    return createdPostId;
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

module.exports = PostService;
