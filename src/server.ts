import cors from 'cors';
import multer from 'multer';
import express from 'express';
import cookieParser from 'cookie-parser';

import { authenticateToken } from './utils/middlewares/jwtAuth';
import { logErrors, wrapErrors, errorHandler } from './utils/middlewares/errorHandler';
import { notFoundHandler } from './utils/middlewares/notFound';
import { multerConfigObject } from './utils/middlewares/multerConfig';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multer(multerConfigObject).single('image'));

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', authenticateToken, require('./routes/posts'));
app.use('/api/friendsPosts', authenticateToken, require('./routes/friendsPosts'));
app.use('/api/friendsUsers', authenticateToken, require('./routes/friendsUser'));
app.use(notFoundHandler);

//Error middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

export default app;
