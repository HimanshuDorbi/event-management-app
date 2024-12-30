import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

//jwt auth verification
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
    (req as AuthRequest).user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
