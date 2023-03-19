import client from "../database";
import bcrypt from 'bcrypt';
import { type } from "os";
import getUserId from "../utils/getUserId";

const saltRounds = process.env.SALT_ROUND
const pepper = process.env.BCRYPT_PASSWORD

export type Product = {
    id?: number,
    category_id? : number | string,
    user_id? : number,
    name: string,
    price: number,
    description: string,
    image?: string
}


export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            console.log("getting products")
            const conn = await client.connect();
            console.log(conn)
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql)
            console.log(result.rows)
            console.log("111")
            conn.release()
            return result.rows
        } catch (err) {
            console.log(err)
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async create(p: Product) : Promise<Product> {
        try {
            const sql1 = "INSERT INTO products (name, price, description, user_id, category_id, image) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
            const conn = await client.connect()
            const result = await conn.query(sql1, [p.name, p.price, p.description, p.user_id, p.category_id, p.image]);
            conn.release()
            
            return result.rows[0]
        } catch (err) {
            console.log(err)
            throw new Error(`Cannot create a product ${err}`)
        }
    }
    async show(id: string): Promise<Product> {
        /* returns a product with a specific id */
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id =($1)';
            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find a product with id ${id}. Error: ${err}`)
        }
    }
}