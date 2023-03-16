import { Category, CategoryStore } from "../models/category";
import express, { Request, Response } from 'express'

const store = new CategoryStore()


const create = async(req: Request, res: Response) => {
    const category: Category = {
        name: req.body.name
    }

    await store.create(category)
    res.json({"message": "category created"})
    res.send()
    return;
}

const index = async(req: Request, res: Response) => {
    const result = await store.index()
    res.json(result)
    res.send()
}

const category_routes = (app: express.Application) => {
    app.post('/category', create);
    app.get('/category', index);
}

export default category_routes;