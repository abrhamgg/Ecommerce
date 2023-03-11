# MyStore
### E-commerce Angular web app.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

### Description
#### Components
    - product-item-component: is responsible for rendering a single component.
    - product-list-component: is responsible for rendering all the products.
    - confirmation-component: is responsible for rendering a page after a user purchases a product.
    - product-item-detail: is responsible for rendering a a single product in detail.
    - cart-component: is responsible for rendering the cart route.
    - header-component: holds router links to product-list page and cart page.
#### Models
    - Product model holds the definition of a product type.
    - User model holds the definition of a user type.
#### Services
    - DataService: is used to send http request and gets the products data for the product list component to render the product list page using it.
    - CartService: is used to add a product to the cart items, remove cart from cart items, update the cart items, upadate the cart items and finally clear the cart.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
