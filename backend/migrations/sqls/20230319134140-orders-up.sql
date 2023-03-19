/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id) on DELETE CASCADE ON UPDATE CASCADE DEFAULT 0,
    cart_item_id bigint REFERENCES cart_items(id) on DELETE CASCADE ON UPDATE CASCADE DEFAULT 0,
    total float
)