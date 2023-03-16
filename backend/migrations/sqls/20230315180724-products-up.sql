/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price float,
    user_id bigint REFERENCES users(id) on DELETE CASCADE ON UPDATE CASCADE DEFAULT 0,
    category_id bigint REFERENCES category(id) on DELETE CASCADE ON UPDATE CASCADE DEFAULT 0,
    description TEXT,
    image TEXT DEFAULT 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
);