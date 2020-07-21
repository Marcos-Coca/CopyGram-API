import multer, { StorageEngine } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { badData } from '@hapi/boom';
import { Request } from 'express';

const storage: StorageEngine = multer.diskStorage({
  filename: (req: Request, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
  },
  destination: path.join(__dirname, '../public/uploads'),
});

export const multerConfigObject = {
  storage,
  fileFilter: (req: Request, file: any, cb: Function) => {
    const filetypes: RegExp = /jpg|jpeg|png|gif/;
    const mimetype: Boolean = filetypes.test(file.mimetype);
    const extname: Boolean = filetypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(badData(), false);
  },
};
