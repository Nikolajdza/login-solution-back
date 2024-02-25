import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../../models/user.model';
import { AppConfig } from '../configuration.types';
import { configuration } from '../configuration';

const appConfig: AppConfig = configuration.app;

passport.use(new GoogleStrategy({
  clientID: appConfig.googleClientId!,
  clientSecret: appConfig.googleClientSecret!,
  callbackURL: appConfig.googleCallbackUrl!,
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