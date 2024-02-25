import { generateJWT } from './jwt.service';
import { UserDocument } from '../models/user.model';

export function generateTokenAndSetCookie(user: UserDocument, res: any, httpOnly: boolean) {
  const token = generateJWT(user);
  res.cookie('token', token, { httpOnly });
}