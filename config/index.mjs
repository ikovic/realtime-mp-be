import convict from 'convict';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const config = convict({
  env: {
    doc: 'Application environment',
    format: ['development', 'production'],
    default: 'development',
    env: 'NODE_ENV',
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

const configPath = path.resolve('config', `${config.get('env')}.json`);

config.loadFile(configPath);

export default config;
