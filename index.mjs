import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import compression from 'compression';
import initializePassport from './passport';
import config from './config';
import api from './routes/api';
import auth from './routes/auth';

mongoose.connect(config.get('dbConnection'));

const app = express();

initializePassport(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());

app.use('/api', api);
app.use('/auth', auth);

app.listen(config.get('port'), () => {
  console.log(`Server started at ${config.get('port')}`);
});
