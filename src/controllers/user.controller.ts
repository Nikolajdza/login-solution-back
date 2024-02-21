import express from 'express';
import { UserDocument } from '../models/user.model';
import { generateJWT } from '../services/jwt.service';

const getUserDetails = async (req: express.Request, res: express.Response) => {
  try {
    const user = req.user as UserDocument;
    const token = generateJWT(user);
    res.cookie('token', token, { httpOnly: true });
    res.json({
      error: false,
      message: 'User has successfully authenticated.',
      token: token,
    });

  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export default getUserDetails;