import R from 'ramda';
import passport from 'passport';
import PassportOAuth from 'passport-google-oauth';
import PassportFacebookStrategy from 'passport-facebook';
import users from '../models/user';
import * as userService from '../services/user';
import { GOOGLE_ID, GOOGLE_SECRET, FACEBOOK_ID, FACEBOOK_SECRET } from '../config';

const GoogleStrategy = PassportOAuth.OAuth2Strategy;
const FacebookStrategy = PassportFacebookStrategy.Strategy;

export default app => {
  passport.serializeUser((collection, done) => {
    done(null, collection);
  });

  passport.deserializeUser(async (user, done) => {
    try {
      const user = await userService.findById(user._id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // A more generalised way to handle strategy callbacks. It takes the user email and the done function.
  // It then proceeds to login the user. If there is no user with the associated email, create him.
  // Both cases (user exists and user doesn't exist) will proceed to the next middleware with the user in the 'user' field of the request object.
  // If it fails in any of the steps it will return the 'Unauthorized' http status.
  const handleStrategy = async (email, done) => {
    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        const newUser = await userService.createUser({
          email,
        });

        return done(null, newUser.toObject());
      }

      done(null, user.toObject());
    } catch (error) {
      done(error);
    }
  };

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback',
      },
      (token, refreshToken, profile, done) => {
        const { emails: [{ value: email }] } = profile._json;

        handleStrategy(email, done);
      },
    ),
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_ID,
        clientSecret: FACEBOOK_SECRET,
        callbackURL: 'http://localhost:5000/auth/facebook/callback',
        profileFields: ['emails'],
      },
      (accessToken, refreshToken, profile, done) => {
        const { email } = profile._json;

        handleStrategy(email, done);
      },
    ),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
