const { MongoClient, ObjectId } = require('mongodb');

const {
  db_user,
  db_password,
  db_name,
  db_cluster,
} = require('../config/index');

const mongoUri = `mongodb+srv://${db_user}:${db_password}@${db_cluster}/${db_name}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = db_name;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }

          console.log('Connnected Succesfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  async get(collection, id, projection = {}) {
    const db = await this.connect();
    return db
      .collection(collection)
      .findOne({ _id: new ObjectId(id) }, { projection: { ...projection } });
  }

  async getAll(collection, query = {}, required = {}) {
    const db = await this.connect();
    return db.collection(collection).find(query).project(required).toArray();
  }

  async create(collection, data) {
    const db = await this.connect();
    return db.collection(collection).insertOne(data).insertedId;
  }

  async update(collection, id, data) {
    const db = await this.connect();
    const result = await db
      .collection(collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: data });

    return result.upsertedId || id;
  }

  async updateDocument(collection, id, action) {
    const db = await this.connect();
    return db
      .collection(collection)
      .updateOne({ _id: new ObjectId(id) }, action);
  }

  async agregation(collection, config) {
    const db = await this.connect();
    return await db.collection(collection).aggregate(config).toArray();
  }

  async delete(collection, id) {
    const db = await this.connect();
    await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return id;
  }
}

module.exports = MongoLib;
