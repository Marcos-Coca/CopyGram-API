const MongoLib = require('../lib/mongo');
const { encryptPassword } = require('../utils/password');

class UsersService {
  constructor() {
    this.DB = new MongoLib();
    this.collection = 'users';
  }

  async findUser(id) {
    const user = await this.DB.get(this.collection, id);
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
}

module.exports = UsersService;
