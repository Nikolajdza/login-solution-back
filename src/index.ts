import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();


const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB().then(() => {
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  });
});