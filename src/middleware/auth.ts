import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module "express-serve-static-core"{
  interface Request {
    user?: string;
  }
}

const JWT_SECRET = 'onekey321';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Hämta token från headern

  console.log(token)
  if (!token) {
    res.status(401).json({ message: 'Access denied, no token provided' });
    return;  // Förhindra vidare exekvering
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);  // Verifiera token
    req.user = decoded.id;  // Lägg till användar-id på request-objektet
    next();  // Fortsätt till nästa middleware eller rutt
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
    return;  // Förhindra vidare exekvering
  }
};