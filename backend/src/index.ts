import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { z} from 'zod';
import bcrypt from 'bcrypt'
import { authMiddleware } from './middleware';
import { Request, Response } from 'express'
import { random } from './utils'
import cors from "cors";
//db 
import { User, Content, LinkModel } from './db'

const app = express();
app.use(express.json());
app.use(cors());

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
    const { link, title, type } = req.body;
    await Content.create({
        link, 
        title,
        type,
        UserId: req.userId,
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

app.delete('/api/v1/content', authMiddleware, async (req: Request, res: Response): Promise<any> => {
    const contentId = req.body.contentId;

    await Content.deleteMany({
        contentId,
        userId: req.userId
    })

    res.json({
        msg: 'content deleted'
    })
})

app.post('/api/v1/brain/share', authMiddleware, async (req: Request, res: Response): Promise<any> => {
    const { share } = req.body;
    if(share) {
        try{
            const userExists = await LinkModel.findOne({
                userId: req.userId
            })
            if(userExists) {
                return res.json({
                    hash: userExists.hash
                })
            }
            const hash = random(10)
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            })
    
            res.json({
                msg: hash
            })
        } catch(e) {
            res.status(403).json({
                msg: "error occurred"
            })
        }
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        })
        res.json({
            message: "Removed Link"
        })
    }
})

app.get('/api/v1/brain/:shareLink', async (req: Request, res: Response): Promise<any> => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if(!link) {
        return res.status(411).json({
            message: "Sorry incorrect user hash"
        })
    }

    const content = await Content.find({
        UserId: link.userId
    })
    console.log(content)

    const user = await User.findOne({
        _id: link.userId
    })

    if(!user) {
        return res.status(411).json({
            message: "user not found"
        })
    }

    res.json({
        username: user.username,
        content: content
    })
})

app.listen(3000, () => {
    console.log('backend running on port 3000')
})