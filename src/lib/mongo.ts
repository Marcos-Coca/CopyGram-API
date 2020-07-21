import { MongoClient, ObjectId } from 'mongodb';
import config from '../config/index';
import { id, aggregation } from '../utils/typescript/globals';

const { db_user, db_password, db_name, db_cluster } = config;

const mongoUri = `mongodb+srv://${db_user}:${db_password}@${db_cluster}/${db_name}?retryWrites=true&w=majority`;

export class MongoLib {
  private client: MongoClient;
  private dbName: string;
  private connection: any;

  constructor() {
    this.client = new MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = db_name as string;
  }

  private connect() {
    if (!this.connection) {
      this.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }

          resolve(this.client.db(this.dbName));
        });
      });
    }
    return this.connection;
  }

  async get(collection: string, id: string, projection = {}) {
    const db = await this.connect();
    return db.collection(collection).findOne({ _id: new ObjectId(id) }, { projection });
  }

  async getAll(collection: string, query = {}, required = {}) {
    const db = await this.connect();
    return db.collection(collection).find(query).project(required).toArray();
  }

  async textSearch(collection: string, text: string, projection = {}, limit: number, page: number) {
    const db = await this.connect();
    return db
      .collection(collection)
      .find({ userName: { $regex: `.*${text}.*` } }, { projection })
      .skip(page * 10)
      .limit(limit)
      .toArray();
  }

  async create(collection: string, data: Object) {
    const db = await this.connect();
    return db.collection(collection).insertOne(data).insertedId;
  }

  async update(collection: string, id: string, data: Object): Promise<string> {
    const db = await this.connect();
    const result = await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: data });

    return result.upsertedId || id;
  }

  async deleteFromArray(collection: string, id: id | string, field: string, value: any) {
    const db = await this.connect();
    return db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $pull: { [field]: value } });
  }

  async appendFromArray(collection: string, id: id | string, field: string, value: any) {
    const db = await this.connect();
    return db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $addToSet: { [field]: value } });
  }

  async aggregation(collection: string, config: aggregation) {
    const db = await this.connect();
    return await db.collection(collection).aggregate(config).toArray();
  }

  async delete(collection: string, id: string): Promise<string> {
    const db = await this.connect();
    await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return id;
  }

  async countDocuments(collection: string, query: Object): Promise<number> {
    const db = await this.connect();
    return db.collection(collection).estimatedDocumentCount(query);
  }
}
