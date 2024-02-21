import { Request, Response, NextFunction } from 'express';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      error: true,
      message: 'User is not authenticated.',
    });
  }
};

export default requireAuth;