import express from 'express';
import passport from 'passport';
import signToken from '../middleware/signToken';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }),
);

router.get('/google/callback', passport.authenticate('google'), signToken);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook'), signToken);

export default router;
