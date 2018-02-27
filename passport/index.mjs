import GoogleTokenStrategy from 'passport-google-id-token';
import users from '../models/user';
import passport from 'passport';
import { GOOGLE_ID, GOOGLE_SECRET, FACEBOOK_ID, FACEBOOK_SECRET } from '../config';
import * as userService from '../services/user';
import PassportOAuth from 'passport-google-oauth';
import PassportFacebookStrategy from 'passport-facebook';

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

  // passport.use(
  //   new GoogleTokenStrategy(
  //     {
  //       clientID: GOOGLE_ID,
  //     },
  //     async (parsedToken, googleId, done) => {
  //       console.log(parsedToken);
  //       try {
  //         const user = await userService.findByGoogleId(googleId);

  //         if (user) {
  //           return done(null, user);
  //         }

  //         const newUser = await userService.createUser({
  //           email: parsedToken.payload.email,
  //           google: {
  //             id: googleId,
  //             name: parsedToken.payload.name,
  //           },
  //         });

  //         done(null, newUser);
  //       } catch (err) {
  //         done(err, null);
  //       }
  //     },
  //   ),
  // );

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback',
      },
      async (token, refreshToken, profile, done) => {
        console.dir(profile._json, 'profile');
        const { id, emails: [{ value: email }] } = profile._json;
        console.log(email, id);
        try {
          const user = await userService.findByGoogleId(id);

          if (user) {
            return done(null, user);
          }

          // const newUser = await userService.createUser({
          //   email: parsedToken.payload.email,
          //   google: {
          //     id: googleId,
          //     name: parsedToken.payload.name,
          //   },
          // });

          done(null, {});
        } catch (error) {
          done(error);
        }
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
      function(accessToken, refreshToken, profile, done) {
        console.log(accessToken, refreshToken, profile, done);

        done(null, {});
      },
    ),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
