import { MongoLib } from '../lib/mongo';
import { Password } from '../utils/password';
import { NewUser, User } from '../utils/typescript/userTypes';
import { id } from '../utils/typescript/globals';
import { ObjectId } from 'mongodb';

export class UsersService {
  private collection: string;
  private DB: MongoLib;
  constructor() {
    this.collection = 'users';
    this.DB = new MongoLib();
  }

  async updateUser(userId: string, data: Object): Promise<string> {
    const user = this.DB.update(this.collection, userId, data);
    return user;
  }

  async findUser(userId: string, required = {}): Promise<User | null> {
    const user = await this.DB.get(this.collection, userId, required);
    return user;
  }

  async getUser(query: Object, required = {}): Promise<Array<User> | null> {
    const user = await this.DB.getAll(this.collection, query, required);
    return user;
  }

  async createUser(user: NewUser): Promise<string> {
    const { password } = user;
    const hashedPassword = await Password.encryptPassword(password);
    const createdUserId = await this.DB.create(this.collection, {
      ...user,
      password: hashedPassword,
    });

    return createdUserId;
  }
}
