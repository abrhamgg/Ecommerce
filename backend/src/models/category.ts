import client from "../database";


export type Category = {
    id?: number,
    name: string
}

export class CategoryStore {
    async create(category: Category) {
        try {
            const conn = await client.connect()
            const sql = 'INSERT INTO category (name) VALUES($1)';
            const result = await conn.query(sql, [category.name])
            conn.release()
        } catch (err) {
            throw new Error('Cannot create category Error: ' + err)
        }
    }

    async index(){
        const conn = await client.connect()
        const sql = 'SELECT * from category;'
        const result = await conn.query(sql)
        return result.rows
    }
}