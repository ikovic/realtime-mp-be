import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/google', passport.authenticate('google-id-token'), (req, res) => {
  res.sendStatus(200);
});

export default router;
