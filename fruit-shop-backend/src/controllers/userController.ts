import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
type ErrorResponseRegister = {
  username?: string;
  email?: string;
  password?: string;
}

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  let errors: ErrorResponseRegister = {};

  if (!username) {
    errors.username = 'Username is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  if (Object.keys(errors).length > 0) {
     res.status(400).json({ message: 'Validation errors', errors });
     return;
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      errors.username = 'User already exists';
      res.status(422).json({ message: 'Validation errors', errors });
      return;
    }
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      errors.email = 'Email already exists';
      res.status(422).json({ message: 'Validation errors', errors });
      return;
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  // res.json({ message: 'Login route' });
  try {
     const { username, password } = req.body;
    // console.log("username", username);
    // console.log("password", password);
    // const username = 'yeye';
    // const password = 'yeyeyeye';

    // Check if user exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });  // Just send the response
      return;
    }
    console.log(user);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });  // Just send the response
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id},
      process.env.JWT_SECRET!,  // Ensure JWT_SECRET is present
      { expiresIn: '1h' }
    );

    // Respond with the token
    res.json({ token,user,message:"Success login" });  // Just send the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error'+error });  // Just send the response
  }
};