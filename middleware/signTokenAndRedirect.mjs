import jwt from 'jsonwebtoken';
import redis from '../utils/redis';
import config from '../config';
import { loginByToken } from '../services/user';

/**
 * Sign a token and redirect the user to the frontend route with the token in query params
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Calls the next middleware
 */
const signTokenAndRedirect = (req, res, next) => {
  const token = jwt.sign(req.user, config.get('jwtSecret'), { expiresIn: config.get('jwtExpiration') });

  loginByToken(token, req.user);

  res.redirect(`${config.get('frontendUrl')}/callback?token=${token}`);
};

export default signTokenAndRedirect;
