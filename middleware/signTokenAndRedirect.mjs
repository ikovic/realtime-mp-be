import jwt from 'jsonwebtoken';
import { JWT_SECRET, EXPIRES_IN as expiresIn, BASE_REDIRECT_URL } from '../config';

// Sign a token and redirect the user to the frontend route with the token in query params
const signTokenAndRedirect = (req, res, next) => {
  const token = jwt.sign(req.user, JWT_SECRET, { expiresIn });

  const redirectHref = req.user.name ? '' : '/user/edit';

  res.redirect(`${BASE_REDIRECT_URL}${redirectHref}?token=${token}`);
};

export default signTokenAndRedirect;
