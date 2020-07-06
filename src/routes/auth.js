const express = require('express');
const { userSchema } = require('../schemas/users');
const validationHandler = require('../middlewares/validationHandler');
const { signUp, signIn } = require('../controllers/authController');

const router = express.Router();

router.post('/sign-in', signIn);

router.post('/sign-up', validationHandler(userSchema), signUp);

module.exports = router;
