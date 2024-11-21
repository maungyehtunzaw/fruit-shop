// src/types/express.d.ts
import express from 'express';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        // Add any other properties that you expect in req.user
      };
    }
  }
}