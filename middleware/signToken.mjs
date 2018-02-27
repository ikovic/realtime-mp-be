import jwt from 'jsonwebtoken';
import { JWT_SECRET, EXPIRES_IN as expiresIn } from '../config';

export default (req, res, next) => {
  const token = req.user ? jwt.sign(req.user, JWT_SECRET, { expiresIn }) : '';

  const redirectHref = token === '' ? '/login' : `?token=${token}`;

  res.redirect(`http://localhost:3000${redirectHref}`);
};
