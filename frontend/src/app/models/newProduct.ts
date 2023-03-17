export interface Product {
    id?: number | undefined;
    name: string | undefined;
    price: number | undefined;
    image: string | undefined;
    description: string | undefined;
    user_id?: number | undefined;
    category_id?: number | undefined;
}