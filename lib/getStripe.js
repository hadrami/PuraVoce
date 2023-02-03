import { loadStripe } from "@stripe/stripe-js";
import React, {useEffect} from 'react' ;

let stripePromise ;
const getStripe = () => {
   
    if (!stripePromise) {
        stripePromise = loadStripe('pk_test_51MWTbEIgmh0fGjcFwvV521q64mt62RZAWv0q22vwdOJyKRnB8AA6ShUxLy5zIb3GNZaStB219lLwOgXIDh1CVuQc00APBNXPKI'); //process.env.NEXT_STRIPE_PUBLIC_KEY
    }
   
    
    return stripePromise;
}
export default getStripe;