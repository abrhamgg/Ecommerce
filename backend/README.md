# Storefront Backend

## Required Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Getting Started

### 1. Package installation
- Express -> ``` npm i express ```
- dotenv -> ``` npm install dontenv```
- db-migrate ->  ```npm install -g db-migrate```  and  ```npm add db-migrate db-migrate-pg```
- jsonwebtoken -> ``` npm add jsonwebtoken```

### 2. Database Setup and Connection.
- By default postgresql will be running in port 5432 or 5433
- ``` CREATE DATABASE storefront_backend_dev;```
- ```CREATE DATABASE storefront_backend_test;```
    #### 2.1 Create a hidden file which stores the enviromental variables. example env.

    ```
    POSTGRES_DB_DEV='storefront_backend_dev'
    POSTGRES_DB_TEST='storefront_backend_test'
    POSTGRES_USER=''
    POSTGRES_PASSWORD=''
    POSTGRES_HOST=''
    ENV=dev
    TOKEN_SECRET=""
    SALT_ROUNDS=
    BCRYPT_PASSWORD=""
    ```
    #### 2.2 Create or Update the database.json file
    ```{
            "dev": {
                "driver": "pg",
                "host": "",
                "database": "",
                "user": "",
                "password": ""
            },
            "test": {
                "driver": "pg",
                "host": "",
                "database": "",
                "user": "",
                "password": ""
            }
        
    ```
    #### 2.3 Migration.
    - Run ```db-migrate up``` to check if the database has connected successfully.

### 3. Starting the app
- The app will use port 3000 so stop if there is any program using this port.
- $``` npm run watch```

### 4. Endpoints
- Product routes
    - GET ```/products``` -> returns all products.
    - GET ``` /products/:id``` -> returns a product by id.
    - GET ``` /products/category/:category``` -> returns products with specific category.
    - POST ``` /products``` -> creates a new product. Token is required
    - GET ``` /products/user/:user_id``` -> returns a product by user.


- User routes
    - POST ``` /users ``` -> creates a new user.
    - GET ``` /users ``` -> returns all users. Token is required
    - GET ``` /login ``` -> login with a user.

- Order routes
    - GET ```/orders``` -> returns all orders. Token is required
    - POST ``` /orders``` -> creates an order. Token is required
    - GET ```/orders/:user_id``` -> returns orders by user

### 5. Running Tests.
- $ ``` npm test or npm run test```

