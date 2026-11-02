import { getAllOrdersAction } from '@/PaymentAction/Order'
import { AllOrders as AllOrdersType, CartItem, Order } from '@/types/orders.t'
import Image from 'next/image'
import React from 'react'

const AllOrders = async () => {

    const data: AllOrdersType = await getAllOrdersAction()

    console.log(data);

    return (
        <div className='my-12 w-full md:w-[90%] mx-auto p-5'>

            <h1 className='text-3xl font-bold mb-8 border-s-4 border-green-600 ps-3'>My <span className='text-green-600'>Orders</span></h1>

            {data?.map(function (order: Order, idx: number) {
                return <div key={idx} className='p-5 mb-5 bg-slate-50 rounded-2xl border border-slate-200'>

                    <div className='flex flex-wrap justify-between items-center gap-3 mb-4 pb-4 border-b border-slate-200'>
                        <h2 className='font-semibold'>Order #{order._id.slice(-6)}</h2>
                        <div className='flex gap-2 text-xs'>
                            <span className={`px-3 py-1 rounded-full ${order.isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{order.isPaid ? "Paid" : "Not Paid"}</span>
                            <span className={`px-3 py-1 rounded-full ${order.isDelivered ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{order.isDelivered ? "Delivered" : "Processing"}</span>
                        </div>
                    </div>


                    <div className='grid grid-cols-12 gap-4'>
                        {order.cartItems?.map(function (item: CartItem, idx: number) {
                            return <div key={idx} className='col-span-6 md:col-span-3 lg:col-span-2 bg-white rounded-xl p-3 text-center'>

                                <Image src={item.product.imageCover} alt="" height={200} width={200} className='w-full h-32 object-contain mb-2' />
                                <h3 className='text-sm line-clamp-1'>{item.product.title}</h3>
                            </div>
                        })}
                    </div>



                    <div className='flex flex-wrap justify-between mt-4 pt-4 border-t border-slate-200'>
                        <h3> payment Method Type : <span className='font-semibold text-green-600'>{order.paymentMethodType}</span></h3>
                        <h3> total Order Price: <span className='font-bold'>{order.totalOrderPrice} EGP</span></h3>
                    </div>
                </div>
            })}

        </div>
    )
}

export default AllOrders
