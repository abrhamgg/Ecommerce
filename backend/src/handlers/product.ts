import { Product, ProductStore } from "../models/product";
import jwt from 'jsonwebtoken';
import express, {Request, Response} from 'express';
import verifyAuthToken from "../middlewares/verify-token";
import getUserId from "../utils/getUserId";


const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products)
        return;
    } catch(err) {
        console.log(err)
        res.json({message: "something went wrong"})
    }
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
        if (!req.body.name || !req.body.price || !req.body.description || !req.body.category_id) {
            res.json({message: "Pleass fill out all required forms"});
            return
        }
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

const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const product = await store.show(id);
        if (!product) {
            res.json({message: "product not found"})
            return
        }
        res.json(product);
    } catch (err) {
        res.status(404).json({message: "product not found"})
    }
}

const deleteProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const product = await store.delete(id);
        res.json(product);
    } catch (err) {
        res.status(404).json({message: "product not found"})
    }
}

const getProductByUser = async(req:Request, res:Response) => {
    try {
        const user_id = req.params.user_id;
        if (!user_id) {
            res.json({message: "Unknow user_id"})
            return
        }
        const products = await store.getProductByUser(Number(user_id))
        res.json(products)
    } catch(err) {
        res.json({message: `error feteching product by user ${err}`})
    }
}

const getProductByCategory= async (req: Request, res: Response) => {
    try {
        const category_id = req.params.category_id
        const product = await store.showByCategory(Number(category_id));
        if (!product) {
            res.json({message: "product not found"})
            return
        }
        res.json(product);
    } catch (err) {
        res.status(404).json({message: "product not found"})
    }
}

const searchProduct = async(req:Request, res: Response) => {
    const searchBody = req.query.searchBody as string
    if (!searchBody) {
        res.json({message: "no search input detected"})
        return
    }
    try {
        const result = await store.searchProduct(searchBody)
        if (result.length == 0) {
            res.json({message: "No Items Found"})
            return
        }
        res.json(result)
    } catch(err) {
        console.log(err)
        res.json({message: "error searching products"})
        return
    }
}

const product_routes = (app:express.Application) => {
    app.get('/products/category/:category_id', getProductByCategory)
    app.get('/search', searchProduct)
    app.get('/products', index)
    app.post('/products', create)
    app.get('/products/:id', getProductById)
    app.get('/products/user/:user_id', getProductByUser)
    app.delete('/products/:id', deleteProductById)
    
}
export default product_routes;