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

const user_routes = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users', index);
}

export default user_routes;