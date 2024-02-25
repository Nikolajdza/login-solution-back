import { Response } from 'express';
import { generateJWT } from './jwt.service';
import { UserDocument } from '../models/user.model';

export function generateTokenAndSetCookie(user: UserDocument, res: Response, httpOnly: boolean) {
  const token = generateJWT(user);
  res.cookie('token', token, { httpOnly });
}
