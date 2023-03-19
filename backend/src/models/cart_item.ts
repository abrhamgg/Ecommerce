import { cp } from "fs";
import client from "../database";
import getUserId from "../utils/getUserId";
import { ProductStore } from "./product";

export type CartItem = {
    id?: number,
    user_id: number | string,
    product_id: number | string,
    quantity: number | string,
    price: number | string,
    subtotal: number | string,
    status?: string
}


export class CartItemStore {
    async index(user_id: number): Promise<CartItem[]> {
        try {
            const conn = await client.connect();
            const sql = "select * from cart_items JOIN products ON cart_items.product_id=products.id WHERE cart_items.user_id=($1) AND cart_items.status = 'active';"
            const result = await conn.query(sql, [user_id])
            conn.release()
            return result.rows
        } catch (err) {
            console.log(err)
            throw new Error(`Could not get cart_items. Error: ${err}`)
        }
    }

    async create(cart_item: CartItem): Promise<CartItem> {
        try {
            const sql = 'INSERT INTO cart_items(user_id, product_id, quantity, price, subtotal, status) VALUES($1, $2, $3, $4, $5, $6)'
            const sql1 = `SELECT * FROM cart_items WHERE product_id = ${cart_item.product_id} AND status != 'completed'`
            const conn = await client.connect();

            /*
            Check if product already exists in the cart and
            update the product if it exists
            */
            const result = await conn.query(sql1)
            if (result.rows.length == 0) {
                console.log('creating')
                const subtotal = Number(cart_item.price) * Number(cart_item.quantity)
                const result = await conn.query(
                    sql, [cart_item.user_id, cart_item.product_id, cart_item.quantity, cart_item.price, subtotal, 'active']
                )
                conn.release()
                return result.rows[0]
            } else {
                console.log('updating');
                const subtotal = Number(cart_item.price) * Number(cart_item.quantity)
                const sql = `UPDATE cart_items  
                SET quantity = ${Number(cart_item.quantity)}, subtotal = ${subtotal}
                WHERE product_id = ${cart_item.product_id} AND user_id = ${cart_item.user_id}`;

                const result = await conn.query(sql);
                conn.release()
                return result.rows[0]
            }

        } catch (err) {
            console.log(err)
            throw new Error(`Cannot get get products. ${err}`)
        }
    }

    async show(user_id: number | string): Promise<CartItem> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM cart_items WHERE user_id =($1)';
            const result = await conn.query(sql, [user_id])
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Can't get cart with user_id: ${user_id}`)
        }
    }
    async updateCartItem(product_id: number, item: CartItem): Promise<CartItem> {
        try {
            const conn = await client.connect()
            const subtotal = Number(item.price) * Number(item.quantity)
            const sql = 'UPDATE cart_items SET quantity=($1), subtotal=($2) WHERE product_id=($3) AND user_id=($4)'
            const result = await conn.query(sql, [item.quantity, subtotal, item.product_id, item.user_id])
            conn.release()
            return result.rows[0]
        } catch(err) {
            console.log(err)
            throw new Error(`Can't update cartItem. Error ${err}`)
        }
    }
    async removeProductFromCart(product_id: number | string): Promise<CartItem> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM cart_items WHERE product_id = ($1)';
            const result = await conn.query(sql, [product_id])
            conn.release()

            return result.rows[0]
        } catch(err) {
            console.log(err)
            throw new Error(`Can't delete product from cart_item with id: ${product_id}`)
        }
    }
    async removeAllFromCart(): Promise<CartItem> {
        try {
            const conn = await client.connect();
            const sql = "DELETE FROM cart_items WHERE product_id != ($1) AND status='active'"
            const result = await conn.query(sql, [0])
            conn.release()

            return result.rows[0]
        } catch(err) {
            console.log(err)
            throw new Error(`Can't clear cart item`)
        }
    }
    async getCartItemTotal(user_id: number): Promise<any> {
        try {
            const conn = await client.connect();
            const sql = "select sum(subtotal) as totalCost from cart_items where user_id=($1) AND status='active';"
            const result = await conn.query(sql, [user_id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            console.log(err)
            throw new Error(`Cannot get total cost. Error: ${err}`)
        }
    }
}