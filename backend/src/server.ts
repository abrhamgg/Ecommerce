import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import user_routes from './handlers/user';
import product_routes from './handlers/product';
import cors from 'cors'
import category_routes from './handlers/category';
import cart_item_routes from './handlers/cart_item';
import errorhandler from 'errorhandler'
import order_routes from './handlers/orders';

const app: express.Application = express()
const address: string = '0.0.0.0:3000'
const port: number = 3000


process.on('unhandledRejection', (reason:any, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
  })
app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}))

app.listen(port, () => {
    console.log(`Server started on port ${address}`);
})
app.get('/', (req: Request, res: Response) => {
    res.send('default page')
});
user_routes(app)
product_routes(app)
category_routes(app)
cart_item_routes(app)
order_routes(app)


export default app