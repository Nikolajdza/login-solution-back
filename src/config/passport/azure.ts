import passport from 'passport';
import { Strategy as CurityStrategy, discoverAndCreateClient } from 'passport-curity';
import { AppConfig } from '../configuration.types';
import { configuration } from '../configuration';
import User from '../../models/user.model';

const appConfig: AppConfig = configuration.app;

export async function createCurityClient() {
  return discoverAndCreateClient({
    issuerUrl: `https://login.microsoftonline.com/${appConfig.azureTenantId}/v2.0`,
    clientID: appConfig.azureClientId!,
    clientSecret: appConfig.azureClientSecret,
    redirectUris: [appConfig.azureCallbackUrl!],
  });
}

createCurityClient().then(client => {
  passport.use(new CurityStrategy({
    client,
    params: {
      scope: 'openid email profile',
    },
  }, async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ providerId: profile.id });
    if (!user) {
      user = new User({
        provider: 'microsoft',
        name: profile.name,
        providerId: profile.oid,
        email: profile.email,
      });
      await user.save();
    }
    done(null, user);
  }));
});