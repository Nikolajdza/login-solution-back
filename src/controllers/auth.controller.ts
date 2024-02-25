import { Request, Response } from 'express';
import { generateTokenAndSetCookie } from '../services/auth.service';
import { UserDocument } from '../models/user.model';

export function handleAuthCallback(req: Request, res: Response, httpOnly: boolean) {
  generateTokenAndSetCookie(req.user as UserDocument, res, httpOnly);
}