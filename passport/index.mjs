import GoogleTokenStrategy from 'passport-google-id-token';
import users from '../models/user';
import passport from 'passport';
import { GOOGLE_ID } from '../config';
import * as userService from '../services/user';

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

  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: GOOGLE_ID,
      },
      async (parsedToken, googleId, done) => {
        try {
          const user = await userService.findByGoogleId(googleId);

          if (user) {
            return done(null, user);
          }

          const newUser = await userService.createUser({
            email: parsedToken.payload.email,
            google: {
              id: googleId,
              name: parsedToken.payload.name,
            },
          });

          done(null, newUser);
        } catch (err) {
          done(err, null);
        }
      },
    ),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
