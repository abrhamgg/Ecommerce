import express, {Request, Response} from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';

const store = new UserStore()


const index = async(req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch(err) {
        res.json(err)
        res.send(400)
    }
}

const create = async(req: Request, res: Response) => {
    console.log('Received request to create a users')
    if (!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.password|| !req.body.email) {
        res.json({'message': 'invalid request parameters'})
        res.status(400)
        return;
    }
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }
    console.log(user);
    try {
        const new_user = await store.create(user)
        console.log('users')
        if (new_user == -1) {
            res.status(200)
            res.json({"message": "User Exists. Please use a different username"})
        } else {
            var token = jwt.sign({user: new_user}, String(process.env.TOKEN_SECRET));
            res.json(token)
        }
    } catch (err) {
        console.log(err)
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    if (!req.body.username || !req.body.password) {
        res.json({'message': 'invalid request parameters'})
        res.status(400)
        return;
    }
    try {
        const u = await store.authenticate(user.username, user.password)
        if (u !== -1) {
            var token = jwt.sign({user: u}, String(process.env.TOKEN_SECRET));
            res.cookie("SESSIONID", token, {httpOnly:true, secure:true})
            res.json(token)
        }
        else {
            res.status(401)
            res.json({"message": "Authentication failed"})
        }
        
    } catch (err) {
        res.status(404)
        res.json({err})
    }
}

const user_routes = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users', index);
    app.post('/login', authenticate)
}

export default user_routes;