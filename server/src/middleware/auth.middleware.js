import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authorization header must start with Bearer',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access token required',
    });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ message: 'Invalid token' });
      } else {
        return res.status(403).json({ message: 'Token verification failed' });
      }
    }

    req.user = user;
    next();
  });
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
};
