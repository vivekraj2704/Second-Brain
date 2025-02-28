import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { z} from 'zod';
import bcrypt from 'bcrypt'
import { authMiddleware } from './middleware';
//db 
import { User, Content } from './db'

const app = express();
app.use(express.json());

const userZodSchema = z.object({
    username: z.string().min(6, { message: "username must have a minimum of 6 characters"}),
    password: z.string().min(5, { message: "password length should be more than 5"})
})

const MONGODB_URL = process.env.MONGODB_URL as string 
mongoose.connect(MONGODB_URL);
(
    async () => {
        try{
            mongoose.connect(MONGODB_URL);
            console.log('MongoDB connected Successfully');
        } catch(e) {
            console.log('mongodb connection failed')
            process.exit(1);
        }
    }
)();

const JWT_KEY = process.env.JWT_SECRET as string;

//@ts-ignore
app.post('/api/v1/signup', async (req, res) => {
    const { username, password } = req.body;

    //zod validation
    const zodResponse = await userZodSchema.safeParse({username, password});
    
    if(!zodResponse.success) {
        return res.status(400).json({
            msg: "Validation failed",
            errors: zodResponse
        })
    }

    const hashedPassword = await bcrypt.hash(password, 3);

    try{
        await User.create({
            username,
            password: hashedPassword
        })
    
        res.json({
            msg: "user created successfully"
        })
    } catch(e) {
        res.status(411).json({
            msg: "User already exists"
        })
    }
})

//@ts-ignore
app.post('/api/v1/signin', async (req, res) => {
    const { username, password } = req.body;

    const zodResponse = userZodSchema.safeParse({username, password});

    if(!zodResponse.success) {
        return res.status(400).json({
            msg: "Validation Failed",
            errors: zodResponse
        })
    }

    const user = await User.findOne({
        username
    })

    if(!user || !user.password) {
        return res.status(400).json({
            msg: "user not found"
        })
    }

    const verify = await bcrypt.compare(password, user.password);
    if(!verify) {
        return res.status(403).json({
            msg: "Invalid credentials"
        })
    }
    const userId = user._id;
    const jwtToken = jwt.sign({ userId }, JWT_KEY);
    res.status(200).json({
        msg: "User created Successfully",
        token: jwtToken
    })
})

//@ts-ignore
app.post('api/v1/content', authMiddleware, async(req: Request, res: Response) => {
    const { link, type } = req.body;
    await Content.create({
        link, 
        type, 
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    return res.status(201).json({
        msg: "Content Created"
    })
})

//@ts-ignore
app.get('api/v1/content', authMiddleware, async (req: Request, res: Response) => {
    const userId = req.userId;

    const content = await Content.findOne({
        _id: userId
    })
})

app.delete('api/v1/content', (req, res) => {

})

app.post('api/v1/brain/share', (req, res) => {

})

app.get('api/v1/brain/:shareLink', (req, res) => {

})

app.listen(3000, () => {
    console.log('backend running on port 3000')
})