//auth middleware 
import jwt from 'jsonwebtoken';
const JWT_SECRET = String(process.env.JWT_SECRET);

export function auth(req, res, next) {
    const tokenizedPassword = localStorage.getItem('auth');

    const verify = jwt.verify(String(tokenizedPassword), JWT_SECRET);
    if(verify) {
        next();
    } else {
        res.json({
            msg: "user not authorized"
        })
    }
}