import Link from 'next/link'
import React from 'react'
import {AiOutlineShopping} from 'react-icons/ai'
import Cart from './Cart'
import { useStateContext } from '@/context/StateContext'
import Image from "next/image";
import logo from './my-logo.png';

const Navbar = () => {

  const {showCart, setShowCart, totalQuantities} = useStateContext();
  return (
    <div className='navbar-container'>
       <Link href='/'>    
       {/*  <Image
          className='logo'
          src={logo}
          alt="Logo"
    
          
        /> */}
        <p className='logo'>
          PuraVoce
        </p> 
     </Link>
      <button type="button" 
      className='cart-icon'
      onClick={() => setShowCart(true)}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{totalQuantities}</span>

      </button>
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
