import { Response, NextFunction, RequestHandler } from 'express';
import { AuthRequest } from './auth';

export const authorizeRole = (role: string): RequestHandler => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }
    next();
  };
};
