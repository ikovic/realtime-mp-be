import convict from 'convict';
import path from 'path';
import dotenv from 'dotenv';
console.log(process.env.NODE_ENV);

dotenv.config({ path: path.resolve(process.cwd(), process.env.NODE_ENV === 'production' ? '.env' : '.dev.env') });

const config = convict({
  env: {
    doc: 'Application environment',
    format: ['development', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'Application binding port',
    default: 5000,
    env: 'PORT',
  },
  frontendUrl: {
    doc: 'Frontend application url',
    default: 'http://localhost:3000',
    env: 'FRONTEND_URL',
  },
  jwtSecret: {
    doc: 'Jsonwebtoken secret',
    default: 'test',
    env: 'JWT_SECRET',
  },
  jwtExpiration: {
    doc: 'Jsonwebtoken expiration',
    default: '30m',
    env: 'JWT_EXPIRATION',
  },
  dbConnection: {
    doc: 'Database connection',
    default: 'mongodb://localhost:27017',
    env: 'DB_CONNECTION',
  },
  redisConnection: {
    doc: 'Redis connection',
    default: 'redis://localhost:6379',
    env: 'REDIS_CONNECTION',
  },
  google: {
    id: {
      doc: 'Google client id',
      default: '',
      env: 'GOOGLE_ID',
    },
    secret: {
      doc: 'Google secret',
      default: '',
      env: 'GOOGLE_SECRET',
    },
  },
  facebook: {
    id: {
      doc: 'Facebook client id',
      default: '',
      env: 'FACEBOOK_ID',
    },
    secret: {
      doc: 'Facebook secret',
      default: '',
      env: 'FACEBOOK_SECRET',
    },
  },
});

export default config;
