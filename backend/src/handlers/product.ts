import { Product, ProductStore } from "../models/product";
import jwt from 'jsonwebtoken';
import express, {Request, Response} from 'express';
import verifyAuthToken from "../middlewares/verify-token";
import getUserId from "../utils/getUserId";


const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products)
    return;
}

const create = async(req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1]
        jwt.verify(String(token), String(process.env.TOKEN_SECRET))
    } catch (err) {
        res.status(401)
        res.json('Acess denied, invalid token')
        return
    }
    try {
        const authorizationHeader = req.headers.authorization
        const token:any = authorizationHeader?.split(' ')[1]
        const user_id = getUserId(token)
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            user_id: Number(user_id),
            category_id: req.body.category_id
        }
        if (req.body.image) {
            product.image = req.body.image
        } else {
            product.image = 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
        }
        const new_product = await store.create(product)
        res.json({message: "product created"})
        return;
    } catch (err) {
        res.json(err)
        return
    }
}

const product_routes = (app:express.Application) => {
    app.get('/products', index)
    app.post('/products', create)
}
export default product_routes;