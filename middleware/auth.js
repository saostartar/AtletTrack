import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import db from '../models/index.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming the token contains a 'role' field
    if (!roles.includes(userRole)) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  };
};

export { authenticateToken, authorizeRoles };
