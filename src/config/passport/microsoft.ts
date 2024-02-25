import passport from 'passport';
import {
  OIDCStrategy,
  VerifyCallback,
  IProfile,
} from 'passport-azure-ad';
import { Request } from 'express';
import User from '../../models/user.model';
import { AppConfig } from '../configuration.types';
import { configuration } from '../configuration';

const appConfig: AppConfig = configuration.app;
const tenantId = appConfig.azureTenantId;

passport.use(new OIDCStrategy({
  identityMetadata: `https://login.microsoftonline.com/${tenantId}/v2.0/.well-known/openid-configuration`,
  clientID: appConfig.azureClientId!,
  clientSecret: appConfig.azureClientSecret,
  responseType: 'code id_token',
  responseMode: 'query',
  redirectUrl: appConfig.azureCallbackUrl!,
  allowHttpForRedirectUrl: true,
  passReqToCallback: true,
},
async (req: Request, iss: string, sub: string, profile: IProfile, accessToken: string, refreshToken: string, done: VerifyCallback) => {
  try {
    let user = await User.findOne({ providerId: sub }); // Assuming providerId stores unique ID
    if (!user) {
      user = new User({
        provider: 'microsoft',
        providerId: sub,
        name: profile.displayName,
        email: profile.emails[0].value,
      });
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));
