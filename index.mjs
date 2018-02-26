import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import initializePassport from './passport';
import { PORT, DB_CONNECTION } from './config';
import api from './routes';
import mongoose from 'mongoose';

mongoose.connect(DB_CONNECTION);

const app = express();

initializePassport(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
