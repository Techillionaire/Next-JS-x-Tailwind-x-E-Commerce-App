import React, { useContext } from 'react'
import Layout from '../components/Layout';
import { Store } from '../utils/Store'
import Link from 'next/link'
import Image from 'next/image'
import { RiDeleteBin2Line } from "react-icons/ri";


const CartScreen = () => {
    const {state, dispatch} = useContext(Store);
    const {
            cart: {cartItems},
        } = state;

    const removeItem = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    }

  return (
    <Layout title='Shopping Cart'>
        <h1 className='mb-4 text-xl'>Shopping Cart</h1>
        {
            cartItems.length === 0 ? (
                <div>Cart is empty. <Link href={`/`}>Go Shopping</Link></div>
            )  : (
                <div className='grid md:grid-cols-4 md:gap-5'>
                    <div className='overflow-x-auto md:col-span-3'>
                        <table className='min-w-full'>
                            <thead className='border-b'>
                                <tr>
                                    <th className='px-5 text-left'>Item</th>
                                    <th className='p-5 text-right'>Quantity</th>
                                    <th className='px-5 text-right'>Price</th>
                                    <th className='p-5'>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.slug} className='border-b'>
                                        <td>
                                            <Link href={`/product/${item.slug}`}>
                                                <a className='flex items-center'>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                    >

                                                    </Image>
                                                    &nbsp;
                                                    {item.name}
                                                </a>
                                            </Link> 

                                        </td>

                                        <td className='p-5 text-right'>{item.quantity}</td>
                                        <td className='p-5 text-right'>${item.price}</td>
                                        <td className='p-5 text-center'>
                                            <button onClick={() => removeItem(item)}>
                                                <i className='w-10 h-10'><RiDeleteBin2Line className='w-7 h-7'/></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            )
        }
    </Layout>
  )
}

export default CartScreen