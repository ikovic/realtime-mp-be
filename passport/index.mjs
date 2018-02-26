import GoogleTokenStrategy from 'passport-google-id-token';
import users from '../models/user';
import passport from 'passport';
import { GOOGLE_ID } from '../config';
import * as userController from '../controllers/user';

export default app => {
  passport.serializeUser((collection, done) => {
    done(null, collection);
  });

  passport.deserializeUser(async (user, done) => {
    try {
      const user = await userController.findById(user._id);
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
          const user = await userController.findByGoogleId(googleId);

          if (user) {
            return done(null, user);
          }

          const newUser = await userController.createUser({
            google: {
              id: googleId,
              name: parsedToken.payload.name,
              email: parsedToken.payload.email,
            },
          });

          done(null, newUser);
        } catch (err) {
          throw err;
        }
      },
    ),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
