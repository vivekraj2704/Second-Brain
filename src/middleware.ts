//auth middleware 
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET as string

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const tokenizedPassword = req.headers['authorization'];

    const verify = jwt.verify(tokenizedPassword as string, JWT_SECRET);
    if(verify) {
        //@ts-ignore
        req.userId = tokenizedPassword.userId;
        next();
    } else {
        res.status(403).json({
            msg: "user not authorized"
        })
    }
}