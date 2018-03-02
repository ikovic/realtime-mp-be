import jwt from 'jsonwebtoken';
import config from '../config';

// Sign a token and redirect the user to the frontend route with the token in query params
const signTokenAndRedirect = (req, res, next) => {
  const token = jwt.sign(req.user, config.get('jwtSecret'), { expiresIn: config.get('jwtExpiration') });

  res.redirect(`${config.get('frontendUrl')}/callback?token=${token}`);
};

export default signTokenAndRedirect;
