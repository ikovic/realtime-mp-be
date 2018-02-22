import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { PORT } from './config';
import api from './routes';

const app = express();

app.use(helmet());
app.use(compression());

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
