import timestring from 'timestring';
import config from '../config';
import users from '../models/user';
import redis, { getAsync } from '../utils/redis';

/**
 * Creates an user with the supplied data
 * @param {object} userData - User data
 */
export const createUser = userData => users.create(userData);

/**
 * Returns an user with the matching email
 * @param {object} email - User email
 */
export const findByEmail = email => users.findOne({ email });

/**
 * Returns an user with the matching id
 * @param {string} id - User id
 */
export const findById = id => users.findById(id);

/**
 * Updates an user with the matching id
 * @param {string} id - User id
 * @param {object} params - Key/value pairs to update
 */
export const updateById = (id, params) => users.update({ _id: id }, params);

/**
 * Logs the user out by deleting his key from the active redis key/value pairs
 * @param {string} token - JWT Token
 */
export const logoutUserByToken = token => redis.del(token);

/**
 * Logs the user in by setting his signed JWT key to the user value
 * @param {string} token - JWT Token
 * @param {object} user - User object
 */
export const loginByToken = (token, user) => redis.set(token, user, 'EX', +timestring(config.get('jwtExpiration')));

/**
 * Checks if the supplied token is in the active redis instance
 * @param {string} token - JWT Token
 */
export const isValidToken = async token => !!await getAsync(token);
