import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }),
);

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  console.log(req.query);
  res.redirect('/');
});

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

export default router;
