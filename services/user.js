const MongoLib = require('../lib/mongo');
const { encryptPassword } = require('../utils/password');

class UsersService {
  constructor() {
    this.DB = new MongoLib();
    this.collection = 'users';
  }

  async getUser(email) {
    const user = await this.DB.getAll(this.collection, {
      email,
    });
    return user;
  }

  async createUser(user) {
    const { name, email, password } = user;
    const hashedPassword = encryptPassword(password);
    const createdUserId = await this.DB.create(this.collection, {
      name,
      email,
      password: hashedPassword,
    });
    return createdUserId;
  }
}

module.exports = UsersService;
