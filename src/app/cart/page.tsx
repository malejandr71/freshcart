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


      {products.length === 0 ? <div className='text-center py-20'>
        <h1 className="text-3xl text-center text-red-500 mb-5"> No Data to Diaplay It </h1>
        <Link href="/"><Button className='rounded-lg px-6 h-11'>Start Shopping</Button></Link>
      </div> :

        <div className='w-full md:w-[90%] mx-auto grid grid-cols-12 gap-6'>

          <div className='col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5'>

            <div className='flex flex-wrap justify-between items-center mb-3'>
              <h1 className='text-2xl font-bold'>Shopping <span className='text-green-600'>Cart</span></h1>

              <div>
                <Button onClick={clearCart} variant="outline" className="mb-5 text-red-500 border-red-200 hover:bg-red-50">Clear</Button>

                <Button className="mb-5 ms-3">
                  <Link href="/payment">Payment</Link>
                </Button>
              </div>
            </div>


            {products.map(function (product: CartProduct, idx: number) {
              return <div key={idx} className="flex flex-wrap gap-4 justify-between items-center py-4 border-b border-green-700/20 last:border-0">

                <div className='flex gap-4 items-center'>

                  <div className='bg-slate-50 rounded-xl p-2'>
                    <Image src={product.product.imageCover} alt={product.product.title} width={100} height={100} className='size-24 object-contain' />
                  </div>

                  <div>
                    <h2 className='text-lg font-semibold mb-1'>{product.product.title}</h2>
                    <p className='mb-2 text-green-600 font-bold'>Price : {product.price} EGP</p>
                    <Button variant="ghost" size="sm" className='text-red-500 px-0 hover:bg-transparent hover:text-red-600' onClick={() => deleteCartItem(product.product.id)}>Remove</Button>
                  </div>

                </div>

                <div className='flex items-center gap-3 border border-slate-200 rounded-lg p-1'>
                  <Button size="icon-sm" variant="ghost" onClick={() => updateCartCount(product.product.id, product.count + 1)}>+</Button>
                  <span className='w-6 text-center font-semibold'>{product.count}</span>
                  <Button size="icon-sm" variant="ghost" onClick={() => updateCartCount(product.product.id, product.count - 1)}>-</Button>
                </div>
              </div>
            })}

          </div>

          <div className='col-span-12 lg:col-span-4'>
            <div className='bg-white rounded-2xl border border-slate-200 p-5 sticky top-32'>
              <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
              <p className='flex justify-between mb-3 text-slate-600'><span>Items</span><span>{products.length}</span></p>
              <p className='flex justify-between mb-3 text-slate-600'><span>Shipping</span><span className='text-green-600'>Free</span></p>
              <p className='font-mono my-3 text-green-700 flex justify-between border-t pt-3 text-lg'><span>Total Cart Price :</span><span className='font-bold'>{totalCartPrice} EGP</span></p>
              <Link href="/payment"><Button className='w-full h-12 rounded-lg text-base mt-2'>Proceed to Checkout</Button></Link>
            </div>
          </div>

        </div>}
    </div>
  )
}

export default Cart
