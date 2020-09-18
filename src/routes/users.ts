import { Router } from 'express';
import { validationHandler } from '../utils/middlewares/validationHandler';
import { updateUserSchema } from '../utils/schemas/users';
import { UsersService } from '../services/users';
import { uploadImage } from '../utils/cloudinary';

const router = Router();

router.put('/', async (req, res, next) => {
  try {
    const { id } = (req as any).payload;

    const { body: user, file } = req;
    const userService = new UsersService();

    if (file.path) {
      const { url, public_id } = await uploadImage(file.path);
      await userService.updateUser(id, { ...user, image: url, public_id });
    } else {
      await userService.updateUser(id, user);
    }

    return res.status(201).json({});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
