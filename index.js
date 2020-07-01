const express = require('express');
const { port } = require('./config/index');
const postsApi = require('./routes/posts');
const authApi = require('./routes/auth');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Crack');
});

postsApi(app);
authApi(app);

app.listen(port, () => {
  console.log(`Server on Port ${port}`);
});
