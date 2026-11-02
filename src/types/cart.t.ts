import { Brand, Category, Subcategory } from "./product.t"

export interface Cart {
    status: string
    message?: string
    numOfCartItems: number
    cartId: string
    data: CartData
}

export interface CartData {
    _id: string
    cartOwner: string
    products: CartProduct[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}

export interface CartProduct {
    count: number
    _id: string
    product: Product2
    price: number
}

export interface Product2 {
    subcategory: Subcategory[]
    _id: string
    title: string
    slug: string
    quantity: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    id: string
}
