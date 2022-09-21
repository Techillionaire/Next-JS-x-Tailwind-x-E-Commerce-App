import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Menu } from '@headlessui/react';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';


const Layout = ({title, children}) => {

    const { status, data: session } = useSession()
    const { state, dispatch } = useContext(Store);
    const {cart} = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);

    const logouthandler = () => {
        Cookies.remove('cart');
        dispatch({type: 'CART_RESET'})
        signOut({callbackUrl: '/login'})
    }
     
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a,c) => a + c.quantity, 0))
    }, [cart.cartItems])
    return (
    <>
        <Head>
            <title>{title ? title + ' - Trenches': 'Trenches'}</title>
            <meta name="description" content="E-commerce website built with next js and tailwid css" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <ToastContainer position="bottom-center" limit={1} />
    
        <div className='flex min-h-screen flex-col justify-between'>
            <header>
                <nav className='flex justify-between h-14 shadow-md items-center px-4'>
                    <Link href={`/`}>
                        <a className='text-lg font-bold'>SHOP-KORRECT</a>
                    </Link>

                    <div>
                        <Link href={`/cart`}><a className='p-2'>Cart{cartItemsCount > 0 && (<span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>{cartItemsCount}</span>)}</a></Link>
                        {status === 'loading' ? ('Loading') : session?.user ? (
                            <Menu as="div" className='relative inline-block'>
                                <Menu.Button className='text-blue-600'>
                                    {session.user.name}
                                </Menu.Button>
                                <Menu.Items className='absolute right-0 w-56 origin-top-right shadow-lg bg-white'>
                                    <Menu.Item>
                                        <DropdownLink className='dropdown-link' href={`/profile`}>Profile</DropdownLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <DropdownLink className='dropdown-link' href={`/order-history`}>Order History</DropdownLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a className='dropdown-link' href={`/#`} onClick={logouthandler}>Logout</a>
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        ) : ( 
                            <Link href={`/login`}><a className='p-2'>Login</a></Link>)}
                    </div>
                </nav>
            </header>

            <main className='container m-auto mt-4 px-4'>
                {children}
            </main>

            <footer className='flex justify-center items-center shadow-inner h-12'>
                <p>Copyright © 2023 Techilionaire Inc.</p>
            </footer>
        </div>

    </>
  )
}

export default Layout