import passport from 'passport';
import {
  OIDCStrategy,
  VerifyCallback,
  IProfile,
} from 'passport-azure-ad';
import { Request } from 'express';
import User from '../../models/user.model';

const CLIENT_ID = process.env.AZURE_CLIENT_ID!;
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET!;
const TENANT_ID = process.env.AZURE_TENANT_ID!;

passport.use(new OIDCStrategy({
  identityMetadata: `https://login.microsoftonline.com/${TENANT_ID}/v2.0/.well-known/openid-configuration`,
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  responseType: 'code id_token',
  responseMode: 'query',
  redirectUrl: 'http://localhost:3000/auth/microsoft/callback',
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
