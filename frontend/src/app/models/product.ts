export class Product {
    id: number | undefined;
    name: string | undefined;
    price: number = 0;
    url: string | undefined;
    description: string | undefined;
    quantity?:number | undefined

    constructor () {
    }
}