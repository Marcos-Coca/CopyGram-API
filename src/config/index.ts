import { object } from '@hapi/joi';

import dotenv from 'dotenv';

dotenv.config();

export default {
  env: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  db_cluster: process.env.DB_CLUSTER,
  access_secret: process.env.ACCESS_JWT_SECRET,
  refresh_secret: process.env.REFRESH_JWT_SECRET,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
