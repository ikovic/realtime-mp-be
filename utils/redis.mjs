import redis from 'redis';
import config from '../config';
import util from 'util';

const client = redis.createClient(config.get('redisConnection'));

export const getAsync = util.promisify(client.get).bind(client);

export default client;
