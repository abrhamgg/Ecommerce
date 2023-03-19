/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS cart_items(
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id) on DELETE CASCADE ON UPDATE CASCADE DEFAULT 0,
    product_id bigint REFERENCES products(id) on DELETE CASCADE ON UPDATE CASCADE DEFAULT 0,
    quantity int,
    price float,
    subtotal float,
    status VARCHAR(50)
)