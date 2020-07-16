const express = require('express');
const cors = require('cors');
const multer = require('multer');

const { port } = require('./config/index');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const cookieParser = require('cookie-parser');
const cookieAuth = require('./middlewares/cookieAuth');
const multerConfigObject = require('./middlewares/multerConfig');

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
app.use('/api/posts', cookieAuth, require('./routes/posts'));
app.use('/api/friendsPosts', cookieAuth, require('./routes/friendsPosts'));
app.use('/api/friendsUsers', cookieAuth, require('./routes/friendsUser'));
app.use(notFound);

//Error middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server on Port ${port}`);
});
