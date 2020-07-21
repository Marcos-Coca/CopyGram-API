import { id } from './types/types';

export interface NewPost {
  user: id;
  image: Image;
  description: string;
}

export interface Post {
  _id: id;
  user: id;
  image: Image;
  description: string;
  likes: Array<id>;
}

export interface UpdatePost {
  image?: Image;
  description?: string;
}

export interface Image {
  url: string;
  public_id: string | number;
}
