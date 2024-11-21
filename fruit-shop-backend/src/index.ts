import { connectDB } from './config/db';
import app from './app';
import { Request, Response } from 'express';
import path from 'path';
import express from 'express';
connectDB();

const PORT = process.env.SERVER_PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Serving static files from:', path.join(__dirname, '../uploads'));
  const upPath = path.resolve(__dirname, 'uploads');
  console.log('Serving static files uppath:', upPath);
});
app.use(express.json());
// console.log('Serving static files from:', path.join(__dirname, './uploads'));
// app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// // app.get('/', (req: Request, res: Response) => {
// //   res.send('Hello, TypeScript Express!');
// // });
// app.get('/', (req, res) => {
//   res.send('Hello, TypeScript Express!');
// });

