import { Product, ProductStore } from "../models/product";
import jwt from 'jsonwebtoken';
import express, {Request, Response} from 'express';
import verifyAuthToken from "../middlewares/verify-token";


const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products)
}


const product_routes = (app:express.Application) => {
    app.get('/products', index)
}
export default product_routes;