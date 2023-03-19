import { CartItem, CartItemStore } from "../models/cart_item";
import jwt from 'jsonwebtoken';
import express, {Request, Response} from 'express';
import getUserId from "../utils/getUserId";
import { verify } from "crypto";
import verifyAuthToken from "../middlewares/verify-token";

const store = new CartItemStore()

const index = async(req: Request, res: Response) => {
    const authorizationHeader = req.headers.authorization
    const token:any = authorizationHeader?.split(' ')[1]
    const user_id = getUserId(token)
    const cartItems = await store.index(Number(user_id));
    res.json(cartItems)
    return;
}

const addProductToCart = async(req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token:any = authorizationHeader?.split(' ')[1]
        const user_id = getUserId(token)
        const cartItem: CartItem = {
            user_id: Number(user_id),
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            price: req.body.price,
            subtotal: Number(req.body.price) * Number(req.body.quantity),
            status: req.body.status
        }
        const newCartItem = await store.create(cartItem);
        res.json({message: "product added to cart"})
        return;
    } catch (err) {
        console.log(err)
        res.json({message: "Something went wrong"})
        return;
    }
}

const update_product = async(req: Request, res: Response) => {
    const authorizationHeader = req.headers.authorization
    const token:any = authorizationHeader?.split(' ')[1]
    const user_id = getUserId(token)
    const cartItem: CartItem = {
        user_id: Number(user_id),
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        price: req.body.price,
        subtotal: Number(req.body.price) * Number(req.body.quantity),
        status: req.body.status
    }
    try {
        const updated_item = await store.updateCartItem(Number(cartItem.product_id), cartItem)
        console.log('update completed');
        res.json({message: "product updated"})
        return
    } catch(err) {
        console.log(err)
        res.json({message: "Error updating product"})
    }
}

const delelteProductFromCart = async(req: Request, res: Response) => {
    const product_id = req.params.product_id
    console.log('tryin')
    if (!product_id) {
        res.json({message: "product_id is not verified"})
    } else {
        try {
            const deleted = await store.removeProductFromCart(product_id);
            res.json({message: "Product deleted from cart"})
            return;
        } catch (err) {
            console.log(err)
            res.json({message: "Something went wrong"})
            return;
        }
    }
}

const clearCart = async(req: Request, res: Response) => {
    try {
        const deleted = await store.removeAllFromCart();
        res.json({message: "Cart is cleared"})
        return;
    } catch (err) {
        console.log(err)
        res.json({message: "Something went wrong"})
        return;
    }
}

const getTotalCost = async(req: Request, res: Response) => {
    const user_id = req.params.user_id
    if (!user_id) {
        res.json({message: "user_id is not verified"})
    } else {
        try {
            const total = await store.getCartItemTotal(Number(user_id))
            res.json(total)
            return
        } catch (err) {
            console.log(err)
            res.json({message: "something went wrong"})
        }
    }
}

const cart_item_routes = (app:express.Application) => {
    app.post('/cartItem',verifyAuthToken, addProductToCart)
    app.get('/cartItem',verifyAuthToken, index);
    app.get('/cartItem/:user_id/total', verifyAuthToken, getTotalCost)
    app.delete('/cartItem', verifyAuthToken, clearCart)
    app.delete('/cartItem/:product_id', verifyAuthToken, delelteProductFromCart)
    app.patch('/cartItem', verifyAuthToken, update_product)
}

export default cart_item_routes;