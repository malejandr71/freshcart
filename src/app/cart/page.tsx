
"use client"
import { cartContext } from '@/Context/CartContext'
import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { CartProduct } from '@/types/cart.t'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '../loading'

const Cart = () => {

  const { totalCartPrice, products, isLoading, deleteCartItem, updateCartCount, clearCart } = useContext(cartContext)



  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='my-12 mx-3 '>


      {products.length === 0 ? <h1 className="text-3xl text-center text-green-700"> No Data to Diaplay It </h1> :

        <div className='w-full p-5 md:w-[90%] mx-auto bg-slate-100'>



          <h1 className='text-2xl '>Cart</h1>

          <p className='font-mono my-3 text-green-700'>Total Cart Price  :  {totalCartPrice} EGP </p>

          <Button onClick={clearCart} className="mb-5">Clear</Button>


          {products.map(function (product: CartProduct, idx: number) {
            return <div key={idx} className="flex justify-between items-center py-3 border-b border-green-700/20">

              <div className='flex gap-3'>

                <div>
                  <Image src={product.product.imageCover} alt={product.product.title} width={200} height={200} />
                </div>

                <div>
                  <h2 className='text-xl mb-3'>{product.product.title}</h2>
                  <p className='mb-3'>Price : {product.price} EGP</p>
                  <Button onClick={() => deleteCartItem(product.product.id)}>Remove</Button>
                </div>

              </div>

              <div className='flex items-center gap-3'>
                <Button onClick={() => updateCartCount(product.product.id, product.count + 1)}>+</Button>
                <span>{product.count}</span>
                <Button onClick={() => updateCartCount(product.product.id, product.count - 1)}>-</Button>
              </div>
            </div>
          })}


          <Link href="/payment">
            <Button className='w-full mt-5'>Payment</Button>
          </Link>

        </div>}
    </div>
  )
}

export default Cart
