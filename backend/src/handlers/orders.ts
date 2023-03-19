import { Order, OrderStore } from '../models/orders';
import verifyAuthToken from "../middlewares/verify-token";
import getUserId from "../utils/getUserId";
import express, {Request, Response} from 'express';

const store = new OrderStore()

const create = async(req: Request, res: Response) => {
    const authorizationHeader = req.headers.authorization
    const token:any = authorizationHeader?.split(' ')[1]
    const user_id = Number(getUserId(token))
    const cart_item_id = req.body.cart_item_id
    const total = req.body.total

    const newOrder: Order = {
        'user_id': user_id,
        'cart_item_id': cart_item_id,
        'total': total
    }
    console.log(newOrder)
    if (!total) {
        res.json({message: 'invalid request parameters'})
        return;
    }
    try {
        const orders = await store.create(newOrder);
        if (orders) {
            // Update cart_items
        }
        res.json({message: "cart has been checked out"})
        return
    } catch (err) {
        res.json({message: "something went wrong"})
        return
    }

}

const index = async(req: Request, res: Response) => {
    try {
        const orders = await store.index()
        res.json(orders)
    } catch(err) {
        res.send({message: "Something went wrong"})
    }
}

const show = async(req: Request, res: Response) => {
    const authorizationHeader = req.headers.authorization
    const token:any = authorizationHeader?.split(' ')[1]
    const user_id = Number(getUserId(token))
    
    try {
        const order = await store.show(user_id)
        res.json(order);
    } catch (err) {
        res.json({message: `Error finding orders by user_id = ${user_id}`})
        res.send()
    }
}

const order_routes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index)
    app.get('/orders/:user_id', verifyAuthToken, show)
    app.post('/orders', verifyAuthToken, create)
}

export default order_routes;