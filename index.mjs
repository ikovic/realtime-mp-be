import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import redis from 'redis';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import compression from 'compression';
import api from './routes/api';
import auth from './routes/auth';
import initializePassport from './passport';
import { PORT, DB_CONNECTION, REDIS_CONNECTION } from './config';

mongoose.connect(DB_CONNECTION);

const redisClient = redis.createClient(REDIS_CONNECTION);

const app = express();

initializePassport(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());

app.use('/api', api);
app.use('/auth', auth);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
