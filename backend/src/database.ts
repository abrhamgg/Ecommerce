import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB_DEV,
    POSTGRES_PASSWORD,
    POSTGRES_USER,
    POSTGRES_DB_TEST,
    ENV
} = process.env

let selected_database;

if (ENV === 'dev') {
    selected_database = POSTGRES_DB_DEV
} else if (ENV === 'test') {
    selected_database = POSTGRES_DB_TEST
}

let client = new Pool({
    host: POSTGRES_HOST,
    database: selected_database,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
})

export default client