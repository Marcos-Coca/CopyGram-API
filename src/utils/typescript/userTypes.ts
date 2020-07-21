import { ObjectId } from 'mongodb';

export interface User {
  _id: string | ObjectId;
  userName: string;
  name: string;
  password: string;
  image?: Object;
  followers?: Array<ObjectId>;
  following?: Array<ObjectId>;
}

export interface NewUser {
  name: string;
  userName: string;
  password: string;
}

export interface UserProfile {
  _id: string | ObjectId;
  userName: string;
  name: string;
  image?: Object;
  followers?: Array<ObjectId>;
  following?: Array<ObjectId>;
}
