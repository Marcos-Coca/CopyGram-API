const express = require('express');
const { port } = require('./config/index');
const postsApi = require('./routes/posts');
const authApi = require('./routes/auth');
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hola Crack');
});

postsApi(app);
authApi(app);

//Error middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server on Port ${port}`);
});
