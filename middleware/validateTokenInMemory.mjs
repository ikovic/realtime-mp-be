import { isValidToken } from '../services/user';

export default async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.sendStatus(400);
  }
  if (await isValidToken(req.headers.authorization)) {
    return next();
  }
  res.sendStatus(401);
};
