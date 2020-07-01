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
    this.client = new MongoClient(mongoUri, { useNewUrlParser: true });
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

  async get(collection, id) {
    const db = await this.connect();
    return db.collection(collection).findOne({ _id: ObjectId(id) });
  }

  async create(collection, data) {
    const db = await this.connect();
    const result = await db.collection(collection).insertOne(data);
    return result.insertedId;
  }

  async update(collection, id, data) {
    const db = await this.connect();
    const result = await db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data });

    return result.upsertedId || id;
  }

  async delete(collection, id) {
    const db = await this.connect();
    await db.collection(collection).deleteOne({ _id: ObjectId(id) });
    return id;
  }
}

module.exports = MongoLib;
