import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebaseConfig';

interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    res.status(403).json({ error: 'Forbidden' });
  }
};
