import * as dotenv from 'dotenv';
import { join } from 'path';
import * as process from 'process';

dotenv.config({ path: join(process.cwd(), '.env') });

export const configuration = {
  app: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
    facebookClientId: process.env.FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    facebookCallbackUrl: process.env.FACEBOOK_CALLBACK_URL,
    jwtSecret: process.env.JWT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    azureTenantId: process.env.AZURE_TENANT_ID,
    azureClientId: process.env.AZURE_CLIENT_ID,
    azureClientSecret: process.env.AZURE_CLIENT_SECRET,
    azureCallbackUrl: process.env.AZURE_CALLBACK_URL,
    successfullLoginUrl: process.env.SUCCESSFULL_LOGIN_URL,
    failedLoginUrl: process.env.FAILED_LOGIN_URL,
    corsOrigin: process.env.CORS_ORIGIN,
    port: process.env.PORT,
  },
  db: {
    uri: process.env.MONGODB_URI,
  },
};

export default () => configuration;