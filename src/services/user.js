const MongoLib = require('../lib/mongo');
const { encryptPassword } = require('../utils/password');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.DB = new MongoLib();
  }

  async findUser(userId, required = {}) {
    const user = await this.DB.get(this.collection, userId, required);
    return user;
  }

  async getUser({ userName }) {
    const user = await this.DB.getAll(this.collection, {
      userName,
    });
    return user;
  }

  async createUser(user) {
    const { userName, password } = user;
    const hashedPassword = await encryptPassword(password);
    const createdUserId = await this.DB.create(this.collection, {
      userName,
      password: hashedPassword,
      followers: [],
      following: [],
    });

    return createdUserId;
  }
}

module.exports = UsersService;
