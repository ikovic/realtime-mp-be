import jwt from 'jsonwebtoken';
import { JWT_SECRET, EXPIRES_IN as expiresIn, FRONTEND_URL } from '../config';

// Sign a token and redirect the user to the frontend route with the token in query params
const signTokenAndRedirect = (req, res, next) => {
  const token = jwt.sign(req.user, JWT_SECRET, { expiresIn });

  res.redirect(`${FRONTEND_URL}/callback?token=${token}`);
};

export default signTokenAndRedirect;
