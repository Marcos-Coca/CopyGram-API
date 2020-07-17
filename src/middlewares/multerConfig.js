const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { badData } = require('@hapi/boom');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
  },
  destination: path.join(__dirname, '../public/uploads'),
});

const multerConfigObject = {
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|jpeg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(badData(), false);
  },
};

module.exports = multerConfigObject;
