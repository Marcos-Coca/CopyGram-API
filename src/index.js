const app = require('./server');
const { port } = require('./config/index');

app.listen(port, () => {
  console.log(`Server on Port ${port}`);
});
