import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface Payload extends Request {
    user: any
}

const verifyAuthToken = (req: Request, res: Response, next:NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader){
            return res.status(400).json({
                message: "Unauthorized, please pass in a token"
            })
        }
        const token = authorizationHeader?.split(' ')[1]
        //console.log(token)
        jwt.verify(String(token), String(process.env.TOKEN_SECRET))
        next()
    } catch (error) {
        res.status(401).json({message: "invalid token"})
    }
}

export default verifyAuthToken;
