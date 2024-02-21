import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../../models/user.model';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  scope: ['email', 'profile'],
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id });

    if (!user) {
      user = new User({
        providerId: profile.id,
        provider: 'google',
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : undefined,
        profilePicture: profile.photos ? profile.photos[0].value : undefined,
      });

      try {
        await user.save();
      } catch (saveError) {
        return done(saveError as Error, undefined);
      }
    }

    done(null, user);
  } catch (findError) {
    done(findError as Error, undefined);
  }
}));