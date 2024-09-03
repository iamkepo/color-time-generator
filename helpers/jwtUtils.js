import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // Lower expiration for access token
}

export function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' }); // Expiration set to 1 day for refresh token
}