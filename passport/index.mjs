import GoogleTokenStrategy from 'passport-google-id-token';
import users from '../models/user';
import passport from 'passport';
import { GOOGLE_ID, GOOGLE_SECRET, FACEBOOK_ID, FACEBOOK_SECRET } from '../config';
import * as userService from '../services/user';
import PassportOAuth from 'passport-google-oauth';
import PassportFacebookStrategy from 'passport-facebook';
import R from 'ramda';

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

  const handleStrategy = async (strategy, { id, email, name }, done) => {
    try {
      const user = await userService.findByEmail(email);

      const data = {
        id,
        name,
      };

      if (!user) {
        const newUser = await userService.createUser({
          email,
          [strategy]: data,
        });

        return done(null, newUser.toObject());
      }

      if (R.isEmpty(user[strategy].toObject())) {
        const updatedUser = { ...user, [strategy]: data };

        await userService.updateById(user._id, { [strategy]: data });

        return done(null, updatedUser);
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
        const { id, emails: [{ value: email }], displayName: name } = profile._json;

        handleStrategy('google', { id, email, name }, done);
      },
    ),
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_ID,
        clientSecret: FACEBOOK_SECRET,
        callbackURL: 'http://localhost:5000/auth/facebook/callback',
        profileFields: ['id', 'emails', 'name'],
      },
      (accessToken, refreshToken, profile, done) => {
        const { id, email, first_name: name } = profile._json;

        handleStrategy('facebook', { id, email, name }, done);
      },
    ),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
