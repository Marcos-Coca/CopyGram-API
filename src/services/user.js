const MongoLib = require('../lib/mongo');
const { encryptPassword } = require('../utils/password');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.DB = new MongoLib();
  }

  async findUser(userId) {
    const user = await this.DB.get(this.collection, userId);
    return user;
  }

  async getUser({ email }) {
    const user = await this.DB.getAll(this.collection, {
      email,
    });
    return user;
  }

  async createUser(user) {
    const { name, email, password } = user;
    const hashedPassword = await encryptPassword(password);
    const createdUserId = await this.DB.create(this.collection, {
      name,
      email,
      password: hashedPassword,
    });

    return createdUserId;
  }

  async createPost(userId, postId) {
    await this.DB.appendValue(this.collection, userId, 'posts', postId);
  }
}

module.exports = UsersService;
