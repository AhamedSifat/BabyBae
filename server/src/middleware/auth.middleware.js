import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access token required',
    });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: 'Token expired',
        });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({
          message: 'Invalid token',
        });
      } else {
        return res.status(403).json({
          message: 'Token verification failed',
        });
      }
    }

    req.user = user;
    next();
  });
};
