import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response, Request }from 'express';
export const SECRET = 'SECr3t';  // This should be in an environment variable in a real application

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      const decodedPayload = user as JwtPayload;
      if (decodedPayload && decodedPayload.id) {
        req.headers['x-user-id'] = decodedPayload.id; // Add the user ID to the headers
        next();
      } else {
        res.sendStatus(403);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

