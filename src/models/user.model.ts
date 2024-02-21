import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

export type UserDocument = Document & {
  name: string;
  email: string;
  provider: string;
  providerId: string;
  profilePicture?: string;
};

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  provider: { type: String, required: true },
  providerId: { type: String, required: true },
  profilePicture: { type: String, required: false },
}, { timestamps: true });

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
