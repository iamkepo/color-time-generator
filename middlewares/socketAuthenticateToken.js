import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


function socketAuthenticateToken(req, res, next) {
  const isHandshake = req._query.sid === undefined;
  if (!isHandshake) {
    req.message = "invalid socket id";
    return next();
  }

  const header = req.headers["authorization"];

  if (!header) {
    req.message = "no token";
    return next();
  }

  if (header.split(' ')[0] !== "bearer ") {
    req.message = "invalid token formate";
    return next();
  }
  const token = header.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      console.log(err);
      req.message = "invalid token data";
      return next();
    }
    req.message = "valid token";
    req.user = data;
    next();
  });
}

export default socketAuthenticateToken;
