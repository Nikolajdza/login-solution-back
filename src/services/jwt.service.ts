import jwt from 'jsonwebtoken';
import ErrorResponse from '../interfaces/ErrorResponse';
import { UserDocument } from '../models/user.model';

const generateJWT = (user: UserDocument): string => {
  const payload = {
    sub: user._id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    profilePicture: user?.profilePicture,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '15m',
  });
};

const decodeJWT = (token: string): UserDocument | ErrorResponse => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserDocument;
    return decoded;
  } catch (error) {
    return { message: 'Invalid JWT' };
  }
};

export { generateJWT, decodeJWT }; 