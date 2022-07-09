import expressSession from 'express-session'
import express from 'express'
import dotenv from 'dotenv'

export const sessionRoutes = express.Router();

dotenv.config();


// Add this line
sessionRoutes.use(
  expressSession({
    secret: "SECRET",
    resave: true,
    saveUninitialized: true,
  }),
)

declare module 'express-session' {
  interface SessionData {
    food:{
        name:string,
        chinese_name:string,
        categories:string,
        tags:string,
    }
  }
}