const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const {
  cloudinary_name,
  cloudinary_api_key,
  cloudinary_api_secret,
} = require('../config');

cloudinary.config({
  cloud_name: cloudinary_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
});

async function uploadImage(imgPath) {
  const imgInfo = await cloudinary.uploader.upload(imgPath);
  fs.unlinkSync(imgPath);
  return imgInfo;
}

module.exports = uploadImage;
