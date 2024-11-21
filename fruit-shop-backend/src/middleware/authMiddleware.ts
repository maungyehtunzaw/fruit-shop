import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {

  const token = req.headers.authorization?.split(' ')[1];
  console.log('token:', token);
  console.log("authMiddleware");

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = decoded; // Assign decoded payload to req.user
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;