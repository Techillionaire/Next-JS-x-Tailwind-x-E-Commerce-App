import React from 'react'
import Head from 'next/head'
import Link from 'next/link'


const Layout = ({title, children}) => {
  return (
    <>
        <Head>
            <title>{title ? title + ' - Trenches': 'Trenches'}</title>
            <meta name="description" content="E-commerce website built with next js and tailwid css" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    
    <div className='flex min-h-screen flex-col justify-between'>
        <header>
            <nav className='flex justify-between h-14 shadow-sm items-center px-4'>
                <Link href={`/`}>
                    <a className='text-lg font-bold'>Trenches</a>
                </Link>

                <div>
                    <Link href={`/cart`}><a className='p-2'>Cart</a></Link>
                    <Link href={`/login`}><a className='p-2'>Login</a></Link>
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