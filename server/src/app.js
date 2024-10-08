import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '1mb'}))
app.use(express.urlencoded({extended: true, limit: '1mb'}))
app.use(express.static('public'))
app.use(cookieParser())

import { router } from './routers/user.router.js';
app.use("/api/v1/users", router)

import { postRouter } from './routers/post.router.js';
app.use("/api/v1/posts", postRouter)

export{
    app
}