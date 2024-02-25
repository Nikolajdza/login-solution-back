import passport from 'passport';
import User from '../../models/user.model';

import './google';
import './facebook';
import { createCurityClient } from './azure'; // import the function from azure.ts


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

createCurityClient();


export default passport;