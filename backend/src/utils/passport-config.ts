import { PassportStatic } from 'passport';
import { User } from '../models/UserModel';
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
export default function (passport: PassportStatic) {
  passport.use(
    new LocalStrategy(async function (
      username: string,
      password: string,
      done: any,
    ) {
      try {
        const user = await User.findOne({ where: { username: username } });
        if (user == null) {
          return done(null, false, { message: 'Incorrect credentials' });
        }
        const comparedPassword = await bcrypt.compare(
          password,
          user.get('password'),
        );
        if (comparedPassword) {
          return done(null, user, { message: 'Logged in' });
        } else {
          return done(null, false, { message: 'Wrong password' });
        }
      } catch (err) {
        return done(err, false, { message: 'Server error' });
      }
    }),
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user: any, done) {
    done(null, user);
  });
}
