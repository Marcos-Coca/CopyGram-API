import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import config from '../config/index';

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export async function uploadImage(path: string) {
  const imgInfo = await cloudinary.uploader.upload(path);
  fs.unlinkSync(path);
  return imgInfo;
}
