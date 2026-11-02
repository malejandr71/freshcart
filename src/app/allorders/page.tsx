import { getAllOrdersAction } from '@/PaymentAction/Order'
import { AllOrders as AllOrdersType, CartItem, Order } from '@/types/orders.t'
import Image from 'next/image'
import React from 'react'

const AllOrders = async () => {

    const data: AllOrdersType = await getAllOrdersAction()

    console.log(data);

    return (
        <div className='my-12 w-full md:w-[80%] mx-auto p-5'>

            <h1 className='text-3xl text-green-700 mb-5 text-center'>All Orders</h1>

            {data?.map(function (order: Order, idx: number) {
                return <div key={idx} className='p-4 mb-5 bg-slate-50'>


                    <div className='grid grid-cols-12'>
                        {order.cartItems?.map(function (item: CartItem, idx: number) {
                            return <div key={idx} className='col-span-3 '>

                                <Image src={item.product.imageCover} alt="" height={200} width={200} />
                                <h3>{item.product.title}</h3>
                            </div>
                        })}
                    </div>



                    <h3> payment Method Type : {order.paymentMethodType}</h3>
                    <h3> total Order Price: {order.totalOrderPrice}</h3>
                </div>
            })}

        </div>
    )
}

export default AllOrders
