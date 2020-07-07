const express = require('express');
const { port } = require('./config/index');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cookieAuth = require('./middlewares/cookieAuth');
const validationHandler = require('./middlewares/validationHandler');
const { userIdSchema } = require('./schemas/users');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hola Crack');
});

//routes
app.use('/api/posts', cookieAuth, require('./routes/posts'));
app.use('/api/auth', require('./routes/auth'));
app.use(
  '/api/friendship',
  validationHandler({ userId: userIdSchema }),
  cookieAuth,
  require('./routes/friendShip')
);

//Error middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server on Port ${port}`);
});
