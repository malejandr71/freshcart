import { Product2 } from "./cart.t"

export type AllOrders = Order[]

export interface Order {
    shippingAddress?: ShippingAddress
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    user: User
    cartItems: CartItem[]
    createdAt: string
    updatedAt: string
    id: number
    __v: number
    paidAt?: string
}

export interface ShippingAddress {
    details: string
    phone: string
    city: string
}

export interface User {
    _id: string
    name: string
    email: string
    phone: string
}

export interface CartItem {
    count: number
    _id: string
    product: Product2
    price: number
}
