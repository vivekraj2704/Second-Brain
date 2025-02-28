import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { z} from 'zod';
import bcrypt from 'bcrypt'
import { authMiddleware } from './middleware';
import { Request, Response } from 'express'
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

app.post('/api/v1/signup', async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    //zod validation
    const zodResponse = await userZodSchema.safeParse({username, password});
    if(!zodResponse.success) {
        return res.status(400).json({
            msg: "Validation failed",
            errors: zodResponse.error
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

app.post('/api/v1/signin', async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    const zodResponse = userZodSchema.safeParse({username, password});

    if(!zodResponse.success) {
        return res.status(400).json({
            msg: "Validation Failed",
            errors: zodResponse.error
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

app.post('/api/v1/content', authMiddleware, async(req: Request, res: Response): Promise<any> => {
    const { link, title } = req.body;
    await Content.create({
        link, 
        title,
        userId: req.userId,
        tags: []
    })

    return res.status(201).json({
        msg: "Content Created"
    })
})

app.get('/api/v1/content', authMiddleware, async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;

    const content = await Content.findOne({
        UserId: userId
    }).populate("UserId", "username")

    res.json({
        content
    })
})

app.delete('/api/v1/content', async (req: Request, res: Response): Promise<any> => {
    const contentId = req.body.contentId;

    await Content.deleteMany({
        contentId,
        userId: req.userId
    })

    res.json({
        msg: 'content deleted'
    })
})

app.post('api/v1/brain/share', (req, res) => {

})

app.get('api/v1/brain/:shareLink', (req, res) => {

})

app.listen(3000, () => {
    console.log('backend running on port 3000')
})