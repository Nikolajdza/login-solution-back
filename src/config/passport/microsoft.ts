import passport from 'passport';
import { OIDCStrategy } from 'passport-azure-ad';
import User from '../../models/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';

const idmetadata = `${process.env.CLOUD_INSTANCE}${process.env.AZURE_TENANT_ID}/.well-known/openid-configuration`;
const clientId = process.env.AZURE_CLIENT_ID;
const clientSecret = process.env.AZURE_CLIENT_SECRET;
const responseType = 'code id_token';
const responseMode = 'form_post';
const redirectUrl = 'ttp://localhost:3000/auth/google/callback';

passport.use(new OIDCStrategy({
  identityMetadata: idmetadata,
  clientID: clientId!,
  responseType: responseType,
  responseMode: responseMode,
  redirectUrl: redirectUrl,
  allowHttpForRedirectUrl: true,
  clientSecret: clientSecret,
  validateIssuer: false,
  isB2C: false,
  passReqToCallback: true,
  scope: ['openid', 'profile', 'email'],
  useCookieInsteadOfSession: false,
  loggingLevel: 'info',
},

async function (iss: any, sub: any, profile: any, accessToken: any, refreshToken: any, done: any) {
  const waadProfile = jwt.decode(accessToken) as JwtPayload;

  if (!waadProfile) {
    return done(new Error('Invalid token'), null);
  }

  try {
    let user = await User.findOne({ providerId: waadProfile.oid });

    if (!user) {
      user = new User({
        providerId: waadProfile.oid,
        provider: 'microsoft',
        name: waadProfile.name,
        email: waadProfile.upn,
        profilePicture: '',
      });

      try {
        await user.save();
      } catch (saveError) {
        return done(saveError, null);
      }
    }

    done(null, user);
  } catch (findError) {
    done(findError, null);
  }
},
));