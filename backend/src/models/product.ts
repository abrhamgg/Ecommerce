import client from "../database";
import bcrypt from 'bcrypt';
import { type } from "os";

const saltRounds = process.env.SALT_ROUND
const pepper = process.env.BCRYPT_PASSWORD

export type Product = {
    id?: number,
    name: string,
    price: number,
    category: string,
    description: string,
    image?: string
}


export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async create(p: Product) : Promise<Product> {
        try {
            if(p.category && p.image) {
                const sql = "INSERT INTO products (name, price, category, image, description) VALUES($1, $2, $3, $4, $5)"
                const conn = await client.connect()
                const result = await conn.query(sql, [p.name, p.price, p.category, p.image, p.description])
                conn.release()

                return result.rows[0]
            }
            const sql1 = "INSERT INTO products (name, price, description) VALUES($1, $2, $3) RETURNING *";
            const conn = await client.connect()
            const result = await conn.query(sql1, [p.name, p.price, p.description]);
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot create a product ${err}`)
        }
    }
}