import passport from 'passport';
import User from '../../models/user.model';

import './google';
import './microsoft';
import './facebook';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.log('Error deserializing user', error);
    done(error, null);
  }
});


export default passport;