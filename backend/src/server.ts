import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import user_routes from './handlers/user';
import cors from 'cors'


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


export default app