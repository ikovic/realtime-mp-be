export const PORT = 5000;

const { NODE_ENV: env } = process.env;

export const DB_CONNECTION = `mongodb://${env === 'development' ? 'localhost' : 'mongo'}:27017`;
export const REDIS_CONNECTION = `redis://${env === 'development' ? 'localhost' : 'redis'}:6379`;
export const GOOGLE_ID = '723860365140-n84h96s612vhcf25tf7ic25q7cnnb8fb.apps.googleusercontent.com';
export const GOOGLE_SECRET = 'tzT0hYb4imxMZ4N6hLbskQKp';
export const FACEBOOK_ID = '213243595893523';
export const FACEBOOK_SECRET = 'a43a976e6fb1006b469ea1064501caab';

export const JWT_SECRET = '<insert_secret_here>';
export const EXPIRES_IN = '1h';

export const FRONTEND_URL = 'http://localhost:3000';
