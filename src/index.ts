import app from './server';
import config from './config/index';

app.listen(config.port, () => {
  console.log(`Server on Port ${config.port}`);
});
