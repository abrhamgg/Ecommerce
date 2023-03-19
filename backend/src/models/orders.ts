import client from "../database"

export type Order = {
    id?: number,
    user_id?: number,
    cart_item_id?: number,
    total: number
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect()
            const sql = "SELECT * FROM orders;"
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            console.log(err)
            throw new Error(`Error getting orders. ${err}`)
        }
    }

    async show(user_id: number): Promise<Order> {
        try {
            const conn = await client.connect()
            const sql = `SELECT * FROM orders WHERE user_id=${user_id}`
            const result = await conn.query(sql)
            conn.release()
            return result.rows[0]
        } catch (err) {
            console.log(err)
            throw new Error(`Error getting orders with user_id = ${user_id}`)
        }
    }

    async create(newOrder: Order): Promise<Order> {
        try {
            const conn = await client.connect()
            const sql = `INSERT INTO orders(user_id, cart_item_id, total) VALUES($1, $2, $3) RETURNING * `
            const result = await conn.query(sql, [newOrder.user_id, newOrder.cart_item_id, newOrder.total])
            if (result) {
                const sql1 = `UPDATE cart_items SET status='completed' WHERE user_id=${newOrder.user_id}`
                await conn.query(sql1)
            }
            conn.release()
            return result.rows[0]
        } catch (err) {
            console.log(err)
            throw new Error(`Error creating order. ${newOrder}`)
        }
    }
}
