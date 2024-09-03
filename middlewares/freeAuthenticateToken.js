import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


function freeAuthenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = false;
    next();
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Token verification failed' });
    }
    req.user = user;
    next();
  });
}

export default freeAuthenticateToken;
