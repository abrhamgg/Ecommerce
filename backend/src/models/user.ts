import client from "../database";
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD

export type User = {
    id? : number,
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    email: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Can't get users. Error ${err}`)
        }
    }
    async create(u: User): Promise<User | number> {
        try {
            const conn = await client.connect()
            const sql = "INSERT INTO users (firstname, lastname, username, password, email) VALUES($1, $2, $3, $4, $5) RETURNING *";
            const hash = bcrypt.hashSync(
                u.password + pepper,
                Number(saltRounds)
            )
            const sql2 = "SELECT * FROM users WHERE username = ($1) OR email = ($2)";
            const checked_user = await conn.query(sql2, [u.firstname, u.email])
            if (checked_user.rows.length == 1) {
                return -1
            }
            const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash, u.email])
            const user = result.rows[0]
            conn.release()
            return user
        } catch(err) {
            throw new Error(`Can't create user ${err}`)
        }
    }
}