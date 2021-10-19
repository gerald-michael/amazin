interface IPrice {
    currency: string,
    amount: number
}
export interface IProduct {
    name: string,
    description: string,
    image_url: string,
    rating: number,
    available_quantity: number,
    quantity: number | null,
    prices: IPrice[]
}
export interface Cart {
    products: IProduct[] | null
}

export interface ICart extends Cart {
    error: string | null,
    loading: boolean,
    success: string | null,
}

export interface ICartAction {
    product: IProduct,
    error: string | null,
    success: string | null,
    type: string,
}