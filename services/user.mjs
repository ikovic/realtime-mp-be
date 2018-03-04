import timestring from 'timestring';
import config from '../config';
import users from '../models/user';
import redis, { getAsync } from '../utils/redis';

export const createUser = userData => users.create(userData);

export const findByEmail = email => users.findOne({ email });

export const findById = id => users.findById(id);

export const updateById = (id, params) => users.update({ _id: id }, params);

export const logoutUserByToken = token => redis.del(token);

export const loginByToken = (token, user) => redis.set(token, user, 'EX', +timestring(config.get('jwtExpiration')));

export const isLoggedIn = async token => !!await getAsync(token);
