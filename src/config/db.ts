import { connect } from 'mongoose';
import { DbConfig } from './configuration.types';
import { configuration } from './configuration';

const dbConfig: DbConfig = configuration.db;
const connectDB = async () => {
  try {
    await connect(dbConfig.uri!);
    console.log('MongoDB is connected...');
  } catch (err) {
    console.error((err as Error).message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;