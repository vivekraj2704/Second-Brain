//auth middleware 
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const tokenizedPassword = req.headers['authorization'];

    const verify = jwt.verify(tokenizedPassword as string, JWT_SECRET);
    if(verify) {
        req.userId = (verify as JwtPayload).userId;
        next();
    } else {
        res.status(403).json({
            msg: "user not authorized"
        })
    }
}