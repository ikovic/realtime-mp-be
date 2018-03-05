import { isValidToken } from '../services/user';

/**
 * Checks whether the token supplied in the authorization header exists in the active redis instance
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Calls the next middleware in the chain
 */
export default async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.sendStatus(400);
  }
  if (await isValidToken(token)) {
    return next();
  }
  res.sendStatus(401);
};
