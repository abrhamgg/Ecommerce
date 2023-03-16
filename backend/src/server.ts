import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import user_routes from './handlers/user';
import product_routes from './handlers/product';
import cors from 'cors'
import category_routes from './handlers/category';

const app: express.Application = express()
const address: string = '0.0.0.0:3000'
const port: number = 3000

app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}))

app.get('/', (req: Request, res: Response) => {
    res.send('default page')
});

app.listen(port, () => {
    console.log(`Server started on port ${address}`);
})
user_routes(app)
product_routes(app)
category_routes(app)


export default app