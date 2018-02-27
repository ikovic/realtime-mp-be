import express from 'express';
import passport from 'passport';
import signTokenAndRedirect from '../middleware/signTokenAndRedirect';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }),
);

router.get('/google/callback', passport.authenticate('google'), signTokenAndRedirect);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook'), signTokenAndRedirect);

export default router;
