import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/lib/client';
import getStripe from '@/lib/getStripe';
import Link from 'next/link';
import React, {useRef} from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineDelete, AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline} from "react-icons/ti";

const Cart = () => {
  const cartRef = useRef();
  const {totalPrice, onRemove, totalQuantities, cartItems, toggleCartItemQuantity , setShowCart} = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const lastElement = cartItems.pop()
    const lastElementslug = lastElement.slug.current;
    cartItems.push(lastElement);
   
  
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({lastElementslug, cartItems}),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }


  return (
    <div className='cart-wrapper' ref={cartRef}>
        <div className='cart-container'>
          <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft />
            <span className='heading'>Your Cart</span>
            <span className='cart-num-items'>{ totalQuantities} items</span>
          </button>
          {cartItems.length < 1 && (
            <div className='empty-cart'>
              <AiOutlineShopping  size={100}/>
              <h3> Opps ...Your bag is Empty! </h3>
              <Link href='/'>
                <button type='button' 
                className='btn'
                onClick={() => setShowCart(false)}
                >
                  Continue Shopping 
                </button>
              </Link>
            </div>
          )}
          <div className='product-container'>
            { cartItems.length >= 1 && cartItems.map((item) => (

              <div className='product' key={item._id}>
                <img src={urlFor(item.image[0])}  className='cart-product-image' alt="product-image" />
                <div className='item-desc'>
                  <div className='flex -top'>
                    <h5> {item?.name}</h5>
                    <h4> {item?.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                        <p className='quantity-desc'>
                            <span className='minus'
                                onClick={ () => toggleCartItemQuantity(item._id, 'dec')}
                                >
                                <AiOutlineMinus />
                            </span>
                            <span className='num'
                                >
                                {item.quantity}
                            </span>
                            <span className='plus'
                                onClick={() => toggleCartItemQuantity(item._id, 'inc')} 
                                >
                                <AiOutlinePlus/>
                            </span>
                        </p>
                    </div>
                    <button
                    type='button'
                    className='remove-item'
                    onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline/>
                    </button>
                  </div>
                </div>
              </div>
            )) }
          </div>
          {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3> Subtotal:</h3>
              <h3> ${totalPrice} </h3>
            </div>
            <div className='btn-container'>
              <button type='button'
              className='btn'
              onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
          )}
        </div>
    </div>
  )
}

export default Cart
