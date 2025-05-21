import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string };
  }
}

const JWT_SECRET = 'onekey321';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Access denied, no token provided' });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
    return;
  }
};
