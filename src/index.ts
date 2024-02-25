import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';
import { AppConfig } from './config/configuration.types';
import { configuration } from './config/configuration';

dotenv.config();
const appConfig: AppConfig = configuration.app;

const port = appConfig.port || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  });
});