CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    username VARCHAR(50) UNIQUE,
    password VARCHAR,
    email VARCHAR(50) UNIQUE
);