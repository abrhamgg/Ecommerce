export interface CartItem {
    id?: number,
    user_id: number | string,
    product_id: number | string,
    quantity: number | string,
    price: number | string,
    subtotal?: number | string,
    status?: string
    // for inner join operations
    image?: string
    name?: string
}