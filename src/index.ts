import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

//db 
import { User } from './db'

const app = express();
mongoose.connect('yourownmongodburl');
const JWT_KEY = 'mysecretkey';

app.post('/api/v1/signup', (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = jwt.sign({password}, JWT_KEY);
    User.create({
        username,
        password: hashedPassword
    })

    res.json({
        msg: "user created successfully"
    })
    
})

app.post('/api/v1/signin', (req, res) => {

})

app.get('api/v1/content', (req, res) => {

})

app.delete('api/v1/content', (req, res) => {

})

app.post('api/v1/brain/share', (req, res) => {

})

app.get('api/v1/brain/:shareLink', (req, res) => {

})