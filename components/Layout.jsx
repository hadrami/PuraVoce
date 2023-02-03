import Head from 'next/head'
import React, { children } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'


const Layout = ({ children}) => {
  return (
    <div className='layout'>
      <Head>
      <link rel="shortcut icon" href="/public/favicon.ico" />
        <title> PuraVoce</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
          { children }
      </main>
      <footer>
        <Footer /> 
      </footer>
    </div>
  )
}

export default Layout
