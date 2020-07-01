const express = require('express');
const { port } = require('./config/index');

const app = express();

app.get('/', (req, res) => {
  res.send('Hola Crack');
});

app.listen(port, () => {
  console.log(`Server on Port ${port}`);
});
