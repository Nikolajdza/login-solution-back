import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../../models/user.model';
import { AppConfig } from '../configuration.types';
import { configuration } from '../configuration';

const appConfig: AppConfig = configuration.app;

passport.use(new FacebookStrategy({
  clientID: appConfig.facebookClientId!,
  clientSecret: appConfig.facebookClientSecret!,
  callbackURL: appConfig.facebookCallbackUrl!,
  profileFields: ['id', 'displayName', 'photos', 'email'],
},
async (accessToken, refreshToken, profile, done) => {

  try {
    let user = await User.findOne({ providerId: profile.id });

    if (!user) {
      user = new User({
        providerId: profile.id,
        provider: 'facebook',
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : 'default@email.com',
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